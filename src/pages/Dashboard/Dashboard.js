import { css } from 'glamor'
import client from 'utils/axios'
import { Helmet } from 'react-helmet'
import { useForm } from 'utils/hooks'
import { withSocket } from 'utils/hoc'
import Heading from 'components/Heading'
import PageTitle from 'components/PageTitle'
import ServersList from 'components/ServersList'
import CreateServerForm from 'components/CreateServerForm'
import React, { useEffect, useState, useReducer } from 'react'
import {
    Button,
    Small,
    toaster,
    Dialog,
    Pane,
    TextInput,
    Text
} from 'evergreen-ui'

const initialServersState = null

const serversReducer = (servers, action) => {
    switch (action.type) {
        case 'SERVERS_FETCHED':
            return action.payload
        case 'SERVER_UPDATED':
            return (servers || []).map(server =>
                server.id === action.server.id ? action.server : server
            )
        case 'RESET_SERVERS':
            return null
        default:
            return servers
    }
}

const Dashboard = ({ auth, echo }) => {
    const [user] = auth
    const [servers, setServers] = useReducer(
        serversReducer,
        initialServersState
    )
    const [regions, setRegions] = useState(null)
    const [provisionCommand, setProvisionCommand] = useState(null)

    const fetchServers = () => {
        servers &&
            setServers({
                type: 'RESET_SERVERS'
            })

        client
            .get(`/servers`)
            .then(({ data }) => {
                setServers({
                    type: 'SERVERS_FETCHED',
                    payload: data
                })
            })
            .catch(() => {
                setServers({
                    type: 'SERVERS_FETCHED',
                    payload: []
                })
                toaster.danger(
                    'Failed to fetch servers. Please try again later.'
                )
            })
    }

    useEffect(() => {
        client
            .get('/servers/regions')
            .then(({ data }) => {
                setRegions(data)
            })
            .catch(() => {
                setRegions({})
            })

        fetchServers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const [socket] = echo

        socket.notification(notification => {
            if (
                notification.type ===
                'App\\Notifications\\Servers\\ServerIsReady'
            ) {
                setServers({
                    type: 'SERVER_UPDATED',
                    server: notification.server
                })
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [echo, user])

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
        [form, setValue, resetForm, setForm],
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

    const setDatabase = database => {
        setValue(
            'databases',
            form.databases.includes(database)
                ? form.databases.filter(d => d !== database)
                : ['mysql', 'mariadb', 'mysql8'].includes(database)
                ? form.databases
                      .filter(d => !['mysql', 'mariadb', 'mysql8'].includes(d))
                      .concat([database])
                : [...form.databases, database]
        )
    }
    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post('/servers', form)
            .then(({ data }) => {
                resetForm()

                setCreatingServer(false)

                setProvisionCommand(data.deploy_command)

                fetchServers()

                toaster.success('Server has been created.')
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)

                !response.data &&
                    !response.data.errors &&
                    toaster.danger('Failed creating server.', {
                        duration: 15,
                        description:
                            "We couldn't create your server. This is most likely because your server provider credentials have expired or do not have write access. Please update your credentials and try again."
                    })
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
            <Dialog
                contentContainerProps={{
                    style: {
                        padding: '0px'
                    }
                }}
                hasFooter={false}
                isShown={!!provisionCommand}
                title="Provision custom server"
                onCloseComplete={() => setProvisionCommand(false)}
            >
                <div
                    className={css({
                        padding: '16px 32px'
                    })}
                >
                    <Text>
                        Almost there! Login to your server as root and run the
                        following command. This would provision your server so
                        that it can be managed by Nesabox. Once done, your
                        server will become active on this dashboard.{' '}
                    </Text>

                    <div
                        className={css({
                            marginTop: '16px'
                        })}
                    >
                        <TextInput
                            readOnly
                            width="100%"
                            id="provision_command"
                            name="provision_command"
                            value={provisionCommand || ''}
                        />

                        <Button
                            tabIndex={0}
                            marginTop={16}
                            onClick={() => {
                                document
                                    .getElementById('provision_command')
                                    .select()
                                document.execCommand('copy')
                                toaster.success('Copied to clipboard.')
                            }}
                        >
                            Copy command
                        </Button>
                    </div>
                </div>
                <Pane borderTop="muted">
                    <Pane padding={16} display="flex" justifyContent="flex-end">
                        <Button
                            tabIndex={0}
                            onClick={() => setProvisionCommand(null)}
                        >
                            Close
                        </Button>
                    </Pane>
                </Pane>
            </Dialog>
            <CreateServerForm
                form={form}
                errors={errors}
                regions={regions}
                setForm={setForm}
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
                        intent="success"
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

export default withSocket(Dashboard)
