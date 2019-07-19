import { css } from 'glamor'
import client from 'utils/axios'
import { Helmet } from 'react-helmet'
import { useForm } from 'utils/hooks'
import Heading from 'components/Heading'
import PageTitle from 'components/PageTitle'
import ServersList from 'components/ServersList'
import React, { useEffect, useState } from 'react'
import { Button, Small, toaster } from 'evergreen-ui'
import CreateServerForm from 'components/CreateServerForm'

const Dashboard = ({ auth }) => {
    const [user] = auth
    const [servers, setServers] = useState(null)
    const [regions, setRegions] = useState(null)

    useEffect(() => {
        client
            .get('/servers/regions')
            .then(({ data }) => {
                setRegions(data)
            })
            .catch(() => {
                setRegions({})
            })

        client
            .get(`/servers`)
            .then(({ data }) => {
                setServers(data)
            })
            .catch(() => {
                setServers([])
                toaster.danger(
                    'Failed to fetch servers. Please try again later.'
                )
            })
    }, [])

    const [creatingServer, setCreatingServer] = useState(false)

    const validProviders = Object.keys(user.providers)
        .filter(provider => user.providers[provider].length > 0)
        .map(provider => ({
            label: <Small textTransform="capitalize">{provider}</Small>,
            value: provider
        }))
        .concat({
            label: <Small textTransform="capitalize">Custom</Small>,
            value: 'custom'
        })

    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        size: '',
        name: '',
        region: '',
        databases: [],
        ip_address: '',
        private_ip_address: '',
        provider: validProviders[0].value,
        credential_id:
            ((user.providers[validProviders[0].value] || [])[0] || {}).id || ''
    })

    const setDatabase = database =>
        setValue(
            'databases',
            form.databases.includes(database)
                ? form.databases.filter(d => d !== database)
                : [...form.databases, database]
        )

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post('/servers', form)
            .then(() => {
                resetForm()

                toaster.success('')
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
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <CreateServerForm
                form={form}
                errors={errors}
                regions={regions}
                setValue={setValue}
                submitting={submitting}
                setDatabase={setDatabase}
                providers={user.providers}
                handleSubmit={handleSubmit}
                validProviders={validProviders}
                creatingServer={creatingServer}
                setCreatingServer={setCreatingServer}
            />
            <PageTitle>
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    })}
                >
                    <Heading>Dashboard</Heading>

                    <Button
                        iconBefore="add"
                        appearance="primary"
                        onClick={() => setCreatingServer(true)}
                    >
                        Add Server
                    </Button>
                </div>
            </PageTitle>

            <ServersList
                servers={servers}
                setCreatingServer={setCreatingServer}
            />
        </React.Fragment>
    )
}

export default Dashboard
