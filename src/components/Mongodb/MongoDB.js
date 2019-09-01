import { css } from 'glamor'
import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import Loader from 'components/Loader'
import Section from 'components/Section'
import Heading from 'components/Heading'
import LoaderIcon from 'components/LoaderIcon'
import {
    Table,
    IconButton,
    BackButton,
    Button,
    SideSheet,
    Pane,
    TextInputField,
    Checkbox,
    toaster,
    Text,
    Small,
    Dialog
} from 'evergreen-ui'

const Mongodb = ({ databases, loading, server, refreshDatabases }) => {
    const [addingUser, setAddingUser] = useState(false)
    const [deletingUser, setDeletingUser] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deletingDatabase, setDeletingDatabase] = useState(null)
    const [addingDatabase, setAddingDatabase] = useState(false)
    const [
        [addUserForm, setAddUserValue],
        [addUserSubmitting, setAddUserSubmitting],
        [addUserErrors, setAddUserErrors]
    ] = useForm({
        name: '',
        readonly: false,
        password: ''
    })
    const [
        [addDatabaseForm, setAddDatabaseValue, resetAddDatabaseForm],
        [addDatabaseSubmitting, setAddDatabaseSubmitting],
        [addDatabaseErrors, setAddDatabaseErrors],
    ] = useForm({
        name: ''
    })
    const [showingUsersForDatabase, setShowingUsersForDatabase] = useState(
        false
    )

    const database_users = showingUsersForDatabase
        ? databases.find(d => d.id === showingUsersForDatabase.id)
              .database_users
        : []

    const addDatabase = e => {
        e.preventDefault()

        setAddDatabaseSubmitting(true)

        client
            .post(`servers/${server.id}/databases/mongodb/add`, addDatabaseForm)
            .then(() => {
                setAddingDatabase(false)
                refreshDatabases(() => {
                    setAddDatabaseSubmitting(false)
                    resetAddDatabaseForm()
                    toaster.success('Database has been added.')
                })
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.errors &&
                    setAddDatabaseErrors(response.data.errors)

                setAddDatabaseSubmitting(false)
            })
    }

    const deleteDatabase = () => {
        setDeleteLoading(true)
        
        client.delete(`servers/${server.id}/databases/${deletingDatabase.id}/mongodb/delete-databases`)
            .then(() => {
                refreshDatabases(() => {
                    setDeletingDatabase(null)
                    setDeleteLoading(false)
                    toaster.success('Database deletion has been queued.')
                })
            })
            .catch(() => {
                toaster.danger('Failed deleting database.')

                setDeleteLoading(false)
            })
    }

    const deleteUser = () => {
        setDeleteLoading(true)
        
        client.delete(`servers/${server.id}/databases/${showingUsersForDatabase.id}/mongodb/delete-users/${deletingUser.id}`)
            .then(() => {
                refreshDatabases(() => {
                    setDeletingUser(null)
                    setDeleteLoading(false)
                    toaster.success('Delete user has been queued.')
                })
            })
            .catch(() => {
                toaster.danger('Failed deleting user.')

                setDeleteLoading(false)
            })
    }

    const addUser = e => {
        e.preventDefault()

        setAddUserSubmitting(true)

        client
            .post(
                `servers/${server.id}/databases/${showingUsersForDatabase.id}/mongodb/add-users`,
                addUserForm
            )
            .then(() => {
                refreshDatabases(() => {
                    setAddingUser(false)
                    toaster.success('User is being added to server.')
                })
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.errors &&
                    setAddUserErrors(response.data.errors)
            })
            .finally(() => {
                setAddUserSubmitting(false)
            })
    }

    if (loading) return <Loader />

    return (
        <Section
            title={
                showingUsersForDatabase
                    ? `Database users for database: ${showingUsersForDatabase.name}`
                    : `Mongodb Databases`
            }
            description={
                showingUsersForDatabase
                    ? `Manage the database users for database: ${showingUsersForDatabase.name}`
                    : `Manage your mongodb databases`
            }
        >
            {!showingUsersForDatabase && (
                <React.Fragment>
                    <div
                        {...css({
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: 16
                        })}
                    >
                        <Button
                            onClick={() => setAddingDatabase(true)}
                            intent="success"
                            appearance="primary"
                        >
                            Add database
                        </Button>
                    </div>

                    {deletingDatabase && (
                        <Dialog
                            intent="danger"
                            title="Delete database"
                            onConfirm={deleteDatabase}
                            isShown={!!deletingDatabase}
                            confirmLabel="Delete database"
                            isConfirmLoading={deleteLoading}
                            onCloseComplete={() => setDeletingDatabase(false)}
                        >   
                            <Text
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                Are you sure you want to delete {deletingDatabase.name} ? 
                            </Text>

                            <Text                                 display="flex"
                                alignItems="center"
                                justifyContent="center">
                                <Small >
                                This will delete all data, alongside all users in this database.
                                </Small>
                            </Text>
                        </Dialog>
                    )}

                    <Table.Head>
                        <Table.TextHeaderCell>Name</Table.TextHeaderCell>

                        <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                    </Table.Head>

                    <Table.Body>
                        {databases.map(database => (
                            <Table.Row key={database.id}>
                                <Table.TextCell>{database.name}</Table.TextCell>
                                <Table.Cell>
                                    {database.is_ready ? (
                                        <React.Fragment>
                                            <IconButton
                                                onClick={() =>
                                                    setShowingUsersForDatabase(
                                                        database
                                                    )
                                                }
                                                marginRight={8}
                                                icon="people"
                                            />
                                            <IconButton
                                                icon="trash"
                                                intent="danger"
                                                onClick={() => setDeletingDatabase(database)}
                                            />
                                        </React.Fragment>
                                    ) : (
                                        <LoaderIcon />
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {databases.length === 0 && (
                            <Text marginTop={16} display='flex' justifyContent='center'>No databases to show.</Text>
                        )}
                    </Table.Body>
                </React.Fragment>
            )}

            {addingDatabase && (
                <SideSheet
                    isShown={addingDatabase}
                    onCloseComplete={() => setAddingDatabase(false)}
                >
                    <Pane width={'100%'} padding={40}>
                        <Heading marginBottom={24}>Add a new database </Heading>

                        <form onSubmit={addDatabase}>
                            <TextInputField
                                required
                                name="name"
                                label="Name"
                                inputWidth="100%"
                                inputHeight={40}
                                value={addDatabaseForm.name}
                                placeholder={'blog-app-com'}
                                isInvalid={!!addDatabaseErrors.name}
                                validationMessage={addDatabaseErrors.name}
                                onChange={e =>
                                    setAddDatabaseValue('name', e.target.value)
                                }
                            />

                            <Button
                                isLoading={addDatabaseSubmitting}
                                type="submit"
                                intent="success"
                                appearance="primary"
                            >
                                Add database
                            </Button>
                        </form>
                    </Pane>
                </SideSheet>
            )}

            {showingUsersForDatabase && (
                <React.Fragment>
                    <div
                        className={css({
                            marginBottom: 16,
                            display: 'flex',
                            justifyContent: 'space-between'
                        })}
                    >
                        <BackButton
                            onClick={() => setShowingUsersForDatabase(null)}
                        />

                        <Button
                            onClick={() => setAddingUser(true)}
                            intent="success"
                            appearance="primary"
                        >
                            Add user
                        </Button>
                    </div>

                    {deletingUser && (
                        <Dialog
                        intent="danger"
                        title="Delete user"
                        onConfirm={deleteUser}
                        isShown={!!deletingUser}
                        confirmLabel="Delete user"
                        isConfirmLoading={deleteLoading}
                        onCloseComplete={() => setDeletingUser(false)}
                    >
                        <Text
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            Are you sure you want to delete user {deletingUser.name} from database {showingUsersForDatabase.name} ? 
                        </Text>
                    </Dialog>
                    )}

                    <Table.Head>
                        <Table.TextHeaderCell>User</Table.TextHeaderCell>

                        <Table.TextHeaderCell>Permissions</Table.TextHeaderCell>

                        <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                    </Table.Head>

                    <Table.Body>
                        {database_users.map(user => (
                            <Table.Row key={user.id}>
                                <Table.TextCell>{user.name}</Table.TextCell>

                                <Table.TextCell>
                                    {user.readonly ? 'READ' : 'READ/WRITE'}
                                </Table.TextCell>

                                <Table.Cell>
                                    {user.is_ready ? (
                                        <IconButton
                                            icon="trash"
                                            intent="danger"
                                            onClick={() => setDeletingUser(user)}
                                        />
                                    ) : (
                                        <LoaderIcon />
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}

                        {database_users.length === 0 && (
                            <Text
                                marginTop={16}
                                display="flex"
                                justifyContent="center"
                            >
                                No users in this database.
                            </Text>
                        )}
                    </Table.Body>

                    <SideSheet
                        isShown={addingUser}
                        onCloseComplete={() => setAddingUser(false)}
                    >
                        <Pane width={'100%'} padding={40}>
                            <Heading marginBottom={24}>
                                Add a user to database:{' '}
                                {showingUsersForDatabase.name}
                            </Heading>
                            <form onSubmit={addUser}>
                                <TextInputField
                                    required
                                    name="name"
                                    label="Name"
                                    inputWidth="100%"
                                    inputHeight={40}
                                    value={addUserForm.name}
                                    placeholder={'Macbook'}
                                    isInvalid={!!addUserErrors.name}
                                    validationMessage={addUserErrors.name}
                                    onChange={e =>
                                        setAddUserValue('name', e.target.value)
                                    }
                                />

                                <TextInputField
                                    required
                                    name="password"
                                    label="Password"
                                    inputWidth="100%"
                                    inputHeight={40}
                                    value={addUserForm.password}
                                    isInvalid={!!addUserErrors.password}
                                    validationMessage={addUserErrors.password}
                                    placeholder={
                                        'Secure password for this user'
                                    }
                                    onChange={e =>
                                        setAddUserValue(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                />

                                <Checkbox
                                    label="User is readonly"
                                    checked={addUserForm.readonly}
                                    onChange={() =>
                                        setAddUserValue(
                                            'readonly',
                                            !addUserForm.readonly
                                        )
                                    }
                                />

                                <Button
                                    isLoading={addUserSubmitting}
                                    type="submit"
                                    intent="success"
                                    appearance="primary"
                                >
                                    Add user
                                </Button>
                            </form>
                        </Pane>
                    </SideSheet>
                </React.Fragment>
            )}
        </Section>
    )
}

export default Mongodb
