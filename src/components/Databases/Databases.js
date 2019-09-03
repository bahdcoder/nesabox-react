import { css } from 'glamor'
import client from 'utils/axios'
import React, { useState } from 'react'
import {
    SideSheet,
    TextInputField,
    Label,
    Pane,
    Button,
    Table,
    Switch,
    Heading,
    withTheme,
    IconButton,
    Dialog,
    Text,
    toaster
} from 'evergreen-ui'
import { useForm } from 'utils/hooks'
import Section from 'components/Section'
import Mongodb from 'components/Mongodb'
import LoaderIcon from 'components/LoaderIcon'
import DatabaseUsers from 'components/DatabaseUsers'

const Databases = props => {
    const { match, server, databases, refreshDatabases } = props
    const [
        [addDatabaseForm, setAddDatabaseValue, resetAddDatabaseForm],
        [addDatabaseSubmitting, setAddDatabaseSubmitting],
        [addDatabaseErrors, setAddDatabaseErrors]
    ] = useForm({
        name: '',
        username: '',
        password: ''
    })
    const [deletingDatabase, setDeletingDatabase] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [createNewUser, setCreateNewUser] = useState(false)
    const [addingDatabase, setAddingDatabase] = useState(false)

    const addDatabase = e => {
        e.preventDefault()

        setAddDatabaseSubmitting(true)

        client
            .post(`/servers/${server.id}/databases`, {
                ...addDatabaseForm,
                type: match.params.database,
                user: createNewUser ? addDatabaseForm.username : undefined,
                password: createNewUser ? addDatabaseForm.password : undefined
            })
            .then(() => {
                toaster.success('Database successfully added.')

                refreshDatabases(() => {
                    setAddingDatabase(false)
                    resetAddDatabaseForm()
                })
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    setAddDatabaseErrors(response.data.errors)

                response && response.message && toaster.danger(response.message)
            })
            .finally(() => {
                setAddDatabaseSubmitting(false)
            })
    }

    const deleteDatabase = () => {
        setDeleteLoading(true)

        client
            .delete(`/servers/${server.id}/databases/${deletingDatabase.id}`)
            .then(() => {
                toaster.success('Database successfully deleted.')

                refreshDatabases(() => {
                    setDeletingDatabase(null)
                    resetAddDatabaseForm()
                })
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger('Failed deleting database.')
            })
            .finally(() => {
                setDeleteLoading(false)
            })
    }

    return match.params.database === 'mongodb' ? (
        <Mongodb {...props} />
    ) : (
        <React.Fragment>
            <Section
                title={`${match.params.database} Databases`}
                description={`Manage your ${match.params.database} databases here.`}
            >
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

                {addingDatabase && (
                    <SideSheet
                        isShown={addingDatabase}
                        onCloseComplete={() => setAddingDatabase(false)}
                    >
                        <Pane width={'100%'} padding={40}>
                            <Heading marginBottom={24}>
                                Add a new database{' '}
                            </Heading>

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
                                        setAddDatabaseValue(
                                            'name',
                                            e.target.value
                                        )
                                    }
                                />

                                <div
                                    className={css({
                                        marginBottom: '16px',
                                        display: 'flex'
                                    })}
                                >
                                    <Switch
                                        checked={createNewUser}
                                        onChange={e => {
                                            setCreateNewUser(!createNewUser)
                                        }}
                                    />

                                    <Label
                                        className={css({
                                            marginLeft: '8px'
                                        })}
                                    >
                                        Create new user
                                    </Label>
                                </div>

                                {createNewUser && (
                                    <React.Fragment>
                                        <TextInputField
                                            required
                                            name="username"
                                            inputHeight={40}
                                            inputWidth="100%"
                                            label="User's name"
                                            value={addDatabaseForm.username}
                                            isInvalid={
                                                !!addDatabaseErrors.username
                                            }
                                            validationMessage={
                                                addDatabaseErrors.username
                                            }
                                            onChange={e =>
                                                setAddDatabaseValue(
                                                    'username',
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <TextInputField
                                            required
                                            name="password"
                                            label="Password"
                                            inputWidth="100%"
                                            inputHeight={40}
                                            value={addDatabaseForm.password}
                                            isInvalid={
                                                !!addDatabaseErrors.password
                                            }
                                            validationMessage={
                                                addDatabaseErrors.password
                                            }
                                            onChange={e =>
                                                setAddDatabaseValue(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </React.Fragment>
                                )}

                                <Button
                                    type="submit"
                                    intent="success"
                                    appearance="primary"
                                    isLoading={addDatabaseSubmitting}
                                >
                                    Add database
                                </Button>
                            </form>
                        </Pane>
                    </SideSheet>
                )}

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
                            Are you sure you want to delete{' '}
                            {deletingDatabase.name} ?
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
                                            icon="trash"
                                            intent="danger"
                                            onClick={() =>
                                                setDeletingDatabase(database)
                                            }
                                        />
                                    </React.Fragment>
                                ) : (
                                    <LoaderIcon />
                                )}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {databases.length === 0 && (
                        <Text
                            marginTop={16}
                            display="flex"
                            justifyContent="center"
                        >
                            No databases to show.
                        </Text>
                    )}
                </Table.Body>
            </Section>

            <Section
                title={`${match.params.database} Database users`}
                description={`Manage your ${match.params.database} database users here.`}
            >
                <DatabaseUsers {...props} />
            </Section>
        </React.Fragment>
    )
}

export default withTheme(Databases)
