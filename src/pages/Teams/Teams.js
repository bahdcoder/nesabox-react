import client from 'utils/axios'
import React, { Fragment, useState, useEffect } from 'react'
import { withAuth } from 'utils/hoc'
import EmptySet from 'components/EmptySet'
import { css } from 'glamor'
import Section from 'components/Section'
import {
    Table,
    IconButton,
    Button,
    Pane,
    Text,
    Dialog,
    TextInputField,
    toaster,
    Checkbox,
    withTheme
} from 'evergreen-ui'

import { useForm } from 'utils/hooks'

const Teams = ({ auth, history, theme }) => {
    const [user] = auth
    const [
        [form, setValue, resetForm, setForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        email: ''
    })
    const [currentTeam, setCurrentTeam] = useState(false)
    const [addingTeam, setAddingTeam] = useState(false)
    const [fetchingTeams, setFetchingTeams] = useState(false)
    const [servers, setServers] = useState([])
    const [teams, setTeams] = useState([])
    const [invites, setInvites] = useState([])
    const [deletingTeam, setDeletingTeam] = useState(null)

    const fetchTeams = () => {
        setFetchingTeams(true)

        client
            .get('/teams')
            .then(({ data }) => {
                setTeams(data)

                const teamValues = {}

                data.forEach(team => {
                    const formValues = {}

                    team.servers.forEach(server => {
                        formValues[server.id] = true
                    })

                    teamValues[team.id] = formValues
                })

                setForm({
                    ...form,
                    ...teamValues
                })
            })
            .catch(e => {
                toaster.danger('Failed fetching teams')
            })
            .finally(() => {
                setFetchingTeams(false)
            })
    }

    const fetchInvites = () => {
        client
            .get('invites')
            .then(({ data }) => {
                setInvites(data)
            })
            .catch(() => {
                toaster.danger('Failed fetching your team invites.')
            })
    }

    useEffect(() => {
        user.subscription.plan === 'business' && fetchTeams()
        user.subscription.plan === 'business' &&
            client
                .get('servers/own')
                .then(({ data }) => {
                    setServers(data)
                })
                .catch(() => {
                    toaster.danger('Failed fetching servers')
                })

        fetchInvites()
    }, [])

    const createTeam = e => {
        e && e.preventDefault()

        setSubmitting(true)

        client
            .post('/teams', form)
            .then(({}) => {
                fetchTeams()

                setAddingTeam(false)

                toaster.success('Team created successfully.')
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const updateManagedServers = () => {
        setSubmitting(true)

        client
            .patch(`teams/${currentTeam.id}/servers`, {
                servers: Object.keys(form[currentTeam.id]).filter(
                    server => form[currentTeam.id][server]
                )
            })
            .then(() => {
                toaster.success('Successfully updated shared servers.')
            })
            .catch(() => {
                toaster.danger('An error occured.')
            })
            .finally(() => setSubmitting(false))
    }

    const sendInvite = () => {
        client
            .post(`teams/${currentTeam.id}/invites`, {
                email: form.email
            })
            .then(({ data }) => {
                setCurrentTeam(data)

                toaster.success('Invite has been sent.')

                setValue('email', '')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => setSubmitting(false))
    }

    const removeTeam = () => {
        setSubmitting(true)
        client
            .delete(`teams/${deletingTeam.id}`)
            .then(() => {
                fetchTeams()

                setDeletingTeam(null)

                toaster.success('Team has been deleted successfully.')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => setSubmitting(false))
    }

    const removeCollaborator = invite => {
        client
            .delete(`invites/${invite.id}`)
            .then(({ data }) => {
                setCurrentTeam(data)

                toaster.success('Collaborator has been removed successfully.')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => setSubmitting(false))
    }

    const updateInvite = (invite, status) => {
        client.patch(`invites/${invite.id}/${status}`)
            .then(() => {
                toaster.success('Successfully ' + status + ' invite to ' + invite.team.name + ' team.')

                fetchInvites()
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
    }

    const renderAuthUserTeamInvites = () => (
        <Section
            title="Your team memberships"
            description="When another user invites you to a team, you will see your invite here. You can accept or decline invites here too."
        >
            <>
                <Table marginTop="2rem">
                    <Table.Head backgroundColor={'transparent'}>
                        <Table.TextHeaderCell>Team</Table.TextHeaderCell>

                        <Table.TextHeaderCell>Status</Table.TextHeaderCell>

                        <Table.TextHeaderCell>Accept</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Decline</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {invites.map(invite => (
                            <Table.Row key={invite.id} borderBottom={'none'}>
                                <Table.TextCell textTransform={'capitalize'}>
                                    {`${invite.team.name} (from ${invite.team.user.name})`}
                                </Table.TextCell>
                                <Table.TextCell textTransform={'capitalize'}>
                                    {invite.status}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {invite.status !== 'active' && <Button onClick={() => updateInvite(invite, 'accepted')} intent="success">Accept</Button>}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {invite.status !== 'active' && <Button onClick={() => updateInvite(invite, 'declined')} intent="danger">Decline</Button>}
                                </Table.TextCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </>
        </Section>
    )

    if (user.subscription.plan !== 'business') {
        return (
            <>
                <div
                    className={css({
                        marginTop: '20px'
                    })}
                >
                    <EmptySet
                        buttonLabel="Upgrade to business"
                        handleAction={() =>
                            history.push('/account/subscriptions')
                        }
                        description="You need to be on the business plan to create teams."
                        heading={
                            user.subscription
                                ? 'You are currently on a free plan.'
                                : 'You are currently on the Pro plan.'
                        }
                    />
                </div>
                {renderAuthUserTeamInvites()}
            </>
        )
    }

    const renderHr = () => (
        <hr
            className={css({
                marginTop: '2rem',
                marginBottom: '2rem',
                height: '2px',
                border: 'none',
                backgroundColor: theme.colors.border.default
            })}
        />
    )

    return (
        <Fragment>
            <Section
                title="Teams"
                description="Here you can add, edit and delete your teams. You can also invite collaborators to your team."
            >
                <div
                    {...css({
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 16
                    })}
                >
                    <Button
                        intent="success"
                        appearance="primary"
                        onClick={() => setAddingTeam(true)}
                    >
                        Add team
                    </Button>
                </div>
                <Dialog
                    intent="success"
                    isShown={addingTeam}
                    confirmLabel="Add team"
                    isConfirmLoading={submitting}
                    onConfirm={() => createTeam()}
                    onCloseComplete={() => setAddingTeam(false)}
                    title={`Add a new team`}
                >
                    <form onSubmit={createTeam}>
                        <TextInputField
                            required
                            name="name"
                            label="Name"
                            inputWidth="100%"
                            value={form.name}
                            isInvalid={!!errors.name}
                            placeholder={'Awecome project'}
                            validationMessage={errors.name}
                            onChange={e => setValue('name', e.target.value)}
                        />
                    </form>
                </Dialog>
                <Dialog
                    intent="success"
                    isShown={!!currentTeam}
                    isConfirmLoading={submitting}
                    hasFooter={false}
                    width="50%"
                    onConfirm={() => updateManagedServers()}
                    onCloseComplete={() => setCurrentTeam(null)}
                    title={`Manage ${currentTeam && currentTeam.name} team`}
                >
                    <Pane
                        paddingLeft="2rem"
                        paddingBottom="2rem"
                        paddingRight="2rem"
                    >
                        {servers.map(server => (
                            <Checkbox
                                key={server.id}
                                label={server.name}
                                checked={
                                    currentTeam &&
                                    (form[currentTeam.id] || {})[server.id]
                                }
                                onChange={e =>
                                    setValue(currentTeam && currentTeam.id, {
                                        ...form[currentTeam.id],
                                        [server.id]: e.target.checked
                                    })
                                }
                            />
                        ))}

                        {servers.length > 0 ? (
                            <Button
                            onClick={() => updateManagedServers()}
                            marginTop="1rem"
                            intent="success"
                            appearance="primary"
                        >
                            Save shared servers
                        </Button>
                        ): <Text>Add some servers to be able to share with this team.</Text>}

                        {renderHr()}

                        <form onSubmit={createTeam}>
                            <TextInputField
                                required
                                name="email"
                                inputWidth="100%"
                                value={form.email}
                                width="70%"
                                placeholder={'E-mail address'}
                                isInvalid={!!errors.email}
                                label="Invite collaborator"
                                validationMessage={errors.email}
                                onChange={e =>
                                    setValue('email', e.target.value)
                                }
                            />

                            <Button
                                intent="success"
                                appearance="primary"
                                onClick={() => sendInvite()}
                            >
                                Send invite
                            </Button>
                        </form>

                        {currentTeam && currentTeam.invites.length > 0 && (
                            <>
                                <Table marginTop="2rem">
                                    <Table.Head backgroundColor={'transparent'}>
                                        <Table.TextHeaderCell>
                                            Name
                                        </Table.TextHeaderCell>

                                        <Table.TextHeaderCell>
                                            Email
                                        </Table.TextHeaderCell>

                                        <Table.TextHeaderCell>
                                            Status
                                        </Table.TextHeaderCell>

                                        <Table.TextHeaderCell>
                                            Remove collaborator
                                        </Table.TextHeaderCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {currentTeam.invites.map(invite => (
                                            <Table.Row
                                                key={invite.id}
                                                borderBottom={'none'}
                                            >
                                                <Table.TextCell
                                                    textTransform={'capitalize'}
                                                >
                                                    {invite.user
                                                        ? invite.user.name
                                                        : null}
                                                </Table.TextCell>
                                                <Table.TextCell>
                                                    {invite.email}
                                                </Table.TextCell>
                                                <Table.TextCell
                                                    textTransform={'capitalize'}
                                                >
                                                    {invite.status}
                                                </Table.TextCell>
                                                <Table.TextCell>
                                                    <IconButton
                                                        icon="trash"
                                                        intent="danger"
                                                        onClick={() =>
                                                            removeCollaborator(
                                                                invite
                                                            )
                                                        }
                                                    />
                                                </Table.TextCell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </>
                        )}
                    </Pane>
                </Dialog>
                <Dialog
                    intent="danger"
                    isConfirmLoading={submitting}
                    isShown={!!deletingTeam}
                    confirmLabel="Yes, Delete Team"
                    onConfirm={() => removeTeam()}
                    onCloseComplete={() => setDeletingTeam(null)}
                    title={`Delete ${deletingTeam && deletingTeam.name} team`}
                >
                    <div
                        className={css({
                            padding: '2rem',
                            textAlign: 'center'
                        })}
                    >
                        <Text>
                            Are you sure you want to delete this team ? All
                            collaborators on this team would lose access to the
                            servers you shared.
                        </Text>
                    </div>
                </Dialog>
                <Table marginTop="2rem">
                    <Table.Head backgroundColor={'transparent'}>
                        <Table.TextHeaderCell
                            flex={'1 0 51%'}
                            paddingRight={0}
                            paddingLeft={0}
                        >
                            Team name
                        </Table.TextHeaderCell>

                        <Table.TextHeaderCell
                            flex={'1 0 30%'}
                        ></Table.TextHeaderCell>

                        <Table.TextHeaderCell
                            paddingRight={0}
                            paddingLeft={0}
                        ></Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {teams.map(team => (
                            <Table.Row key={team.id} borderBottom={'none'}>
                                <Table.TextCell
                                    paddingRight={0}
                                    flex={'1 0 51%'}
                                    paddingLeft={0}
                                    textTransform={'capitalize'}
                                >
                                    {team.name}
                                </Table.TextCell>
                                <Table.TextCell
                                    flex={'1 0 30%'}
                                    textTransform={'capitalize'}
                                >
                                    <Button
                                        onClick={() => setCurrentTeam(team)}
                                    >
                                        Manage team
                                    </Button>
                                </Table.TextCell>
                                <Table.TextCell
                                    flexGrow={1}
                                    paddingLeft={0}
                                    paddingRight={0}
                                >
                                    <IconButton
                                        onClick={() => setDeletingTeam(team)}
                                        icon="trash"
                                        intent="danger"
                                    />
                                </Table.TextCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Section>
            {renderAuthUserTeamInvites()}
        </Fragment>
    )
}

export default withTheme(withAuth(Teams))
