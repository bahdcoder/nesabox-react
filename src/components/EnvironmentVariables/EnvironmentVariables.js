import { css } from 'glamor'
import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import Section from 'components/Section'
import Heading from 'components/Heading'
import {
    Button,
    TextInput,
    IconButton,
    withTheme,
    Small,
    toaster
} from 'evergreen-ui'

const disabledKeys = ['PORT']

const EnvironmentVariables = ({ site, server }) => {
    const [env, setEnv] = useState(null)
    const [isFetchingEnv, setIsFetchingEnv] = useState(false)

    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        key: '',
        value: ''
    })

    const deleteEnvVariable = key => {
        client
            .delete(
                `/servers/${server.id}/sites/${site.id}/env-variables/${key}`
            )
            .then(({ data }) => {
                setEnv(data)

                toaster.success('Environment variable deleted.')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
    }

    const addEnvVariable = () => {
        setSubmitting(true)

        client
            .post(`/servers/${server.id}/sites/${site.id}/env-variables`, form)
            .then(({ data }) => {
                setEnv(data)

                resetForm()

                setErrors({})

                toaster.success('Environment variable added.')
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)

                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const fetchEnv = () => {
        setIsFetchingEnv(true)

        client
            .get(`/servers/${server.id}/sites/${site.id}/env-variables`)
            .then(({ data }) => {
                setEnv(data)
            })
            .finally(() => {
                setIsFetchingEnv(false)
            })
    }

    return (
        <Section
            title="Environment variables"
            description="These key-value pairs would be set as environment variables before each site deployment."
        >
            {!env && (
                <Button onClick={fetchEnv} isLoading={isFetchingEnv}>
                    Reveal environment variables
                </Button>
            )}
            {env && (
                <div
                    {...css({
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    })}
                >
                    <Small>Environment variables</Small>

                    <Button
                        onClick={() => setEnv(null)}
                        isLoading={isFetchingEnv}
                    >
                        Hide environment variables
                    </Button>
                </div>
            )}
            {env && (
                <React.Fragment>
                    {Object.keys(env).map(envKey => (
                        <div
                            key={envKey}
                            className={css({
                                marginTop: 16,
                                display: 'flex',
                                width: '100%'
                            })}
                        >
                            <TextInput
                                value={envKey}
                                marginRight={'5%'}
                                width="40%"
                                readOnly
                            />
                            <TextInput
                                value={env[envKey]}
                                marginRight={'10%'}
                                width="40%"
                                readOnly
                            />
                            <IconButton
                                disabled={disabledKeys.includes(envKey)}
                                width="5%"
                                intent="danger"
                                icon="trash"
                                onClick={() => deleteEnvVariable(envKey)}
                            />
                        </div>
                    ))}

                    <div
                        className={css({
                            marginTop: 16,
                            display: 'flex',
                            width: '100%'
                        })}
                    >
                        <TextInput
                            isInvalid={!!errors.key}
                            value={form.key}
                            marginRight={'5%'}
                            width="40%"
                            onChange={e => setValue('key', e.target.value)}
                        />
                        <TextInput
                            isInvalid={!!errors.value}
                            value={form.value}
                            marginRight={'5%'}
                            width="40%"
                            onChange={e => setValue('value', e.target.value)}
                        />
                        <Button
                            onClick={addEnvVariable}
                            isLoading={submitting}
                            display="flex"
                            appearance="primary"
                            justifyContent="center"
                            intent="success"
                            width="10%"
                        >
                            Add
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </Section>
    )
}

export default EnvironmentVariables
