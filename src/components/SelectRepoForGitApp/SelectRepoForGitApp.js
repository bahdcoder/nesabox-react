import React from 'react'
import { css } from 'glamor'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import { Link as RouterLink } from 'react-router-dom'
import {
    SegmentedControl,
    Button,
    Alert,
    Link,
    Text,
    Label,
    Select,
    TextInputField
} from 'evergreen-ui'

const providerNames = {
    github: 'Github',
    gitlab: 'Gitlab'
}

const SelectRepoForGitApp = ({ auth, site, server, setServer }) => {
    const [user] = auth

    const availableProviders = Object.keys(user.source_control)
        .filter(provider => user.source_control[provider])
        .map(provider => ({
            label: providerNames[provider],
            value: provider
        }))

        const [
            [form, setValue],
            [submitting, setSubmitting],
            [errors, setErrors]
        ] = useForm({
            repository: site.repository || '',
            branch: site.repository_branch || 'master',
            provider: availableProviders.length > 0 ? availableProviders[0].value : '',
        })

    const installRepository = (e) => {
        e.preventDefault()

        setSubmitting(true)

        client.post(`/servers/${server.id}/sites/${site.id}/install-repository`, form)
            .then(({ data }) => {
                setServer(data)

                setErrors({})
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <React.Fragment>
            {availableProviders.length === 0 && (
                <Alert marginTop={16} title="Setup a git repository provider.">
                    <Text>
                        Looks like you haven't configured any source control
                        providers yet. Configure providers
                    </Text>{' '}
                    <Link is={RouterLink} to="/account/applications">
                        here
                    </Link>
                    .
                </Alert>
            )}
            {availableProviders.length > 0 && (
                <React.Fragment>
                    <SegmentedControl
                        marginTop={16}
                        marginBottom={16}
                        options={availableProviders}
                        onChange={value => setValue('provider', value)}
                    />

                    <form onSubmit={installRepository}>
                        <div
                            {...css({
                                display: 'flex',
                                width: '100%'
                            })}
                        >
                            <TextInputField
                                required
                                value={form.repository}
                                onChange={e =>
                                    setValue('repository', e.target.value)
                                }
                                width={'53%'}
                                label="Repository"
                                isInvalid={!!errors.repository}
                                validationMessage={errors.repository}
                                placeholder="user/repository"
                            />
                            <TextInputField
                                required
                                value={form.branch}
                                width={'45%'}
                                onChange={e =>
                                    setValue('branch', e.target.value)
                                }
                                marginLeft="2%"
                                label="Branch"
                                isInvalid={!!errors.branch}
                                validationMessage={errors.branch}
                                placeholder="master"
                            />
                        </div>
                        <div
                            {...css({
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end'
                            })}
                        >
                            <Button isLoading={submitting || site.installing_repository} marginTop={8} appearance="primary">
                                Install repository
                            </Button>
                        </div>
                    </form>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default withAuth(SelectRepoForGitApp)
