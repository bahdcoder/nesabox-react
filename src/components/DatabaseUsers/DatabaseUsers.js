import React, { useState } from 'react'
import { css } from 'glamor'
import client from 'utils/axios'
import {
    Button,
    SideSheet,
    Pane,
    TextInputField,
    Table,
    IconButton,
    Dialog,
    Text,
    Label,
    Checkbox,
    toaster
} from 'evergreen-ui'
import LoaderIcon from 'components/LoaderIcon'
import Heading from 'components/Heading'
import { useForm } from 'utils/hooks'
import Loader from 'components/Loader'

const DatabaseUsers = ({
    databases,
    databaseUsers,
    server,
    match,
    refreshDatabases
}) => {
    const [addingUser, setAddingUser] = useState(false)
    const [deletingUser, setDeletingUser] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(null)

    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        password: '',
        databases: [],
        type: match.params.database
    })

    const addUser = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post(`servers/${server.id}/database-users`, form)
            .then(() => {
                refreshDatabases(() => {
                    setAddingUser(false)

                    toaster.success('Database user added')
                })
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.errors &&
                    setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const deleteUser = () => {
        setDeleteLoading(true)

        client
            .delete(`servers/${server.id}/database-users/${deletingUser.id}`)
            .then(() => {
                refreshDatabases(() => {
                    setDeleteLoading(false)
                    setDeletingUser(null)

                    toaster.success('Database user deleted.')
                })
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger('Failed deleting database user.')

                setDeleteLoading(false)
                setDeletingUser(null)
            })
    }

    if (!databaseUsers) return <Loader />

    return (
        <React.Fragment>
            <div
                {...css({
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: 16
                })}
            >
                <Button
                    onClick={() => setAddingUser(true)}
                    intent="success"
                    appearance="primary"
                >
                    Add user
                </Button>
            </div>

            {addingUser && (
                <SideSheet
                    isShown={addingUser}
                    onCloseComplete={() => setAddingUser(false)}
                >
                    <Pane width={'100%'} padding={40}>
                        <Heading marginBottom={24}>Add a new user </Heading>

                        <form onSubmit={addUser}>
                            <TextInputField
                                required
                                name="name"
                                label="Name"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.name}
                                isInvalid={!!errors.name}
                                validationMessage={errors.name}
                                onChange={e => setValue('name', e.target.value)}
                            />

                            <TextInputField
                                required
                                name="password"
                                label="Password"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.password}
                                isInvalid={!!errors.password}
                                validationMessage={errors.password}
                                onChange={e =>
                                    setValue('password', e.target.value)
                                }
                            />

                            <Label>User can access databases:</Label>
                            {databases.map(database => (
                                <Checkbox
                                    key={database.id}
                                    label={database.name}
                                    checked={form.databases.includes(
                                        database.id
                                    )}
                                    onChange={() =>
                                        setValue(
                                            'databases',
                                            form.databases.includes(database.id)
                                                ? form.databases.filter(
                                                      d => d !== database.id
                                                  )
                                                : [
                                                      ...form.databases,
                                                      database.id
                                                  ]
                                        )
                                    }
                                />
                            ))}

                            <Button
                                type="submit"
                                intent="success"
                                appearance="primary"
                                isLoading={submitting}
                            >
                                Add user
                            </Button>
                        </form>
                    </Pane>
                </SideSheet>
            )}

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
                        Are you sure you want to delete {deletingUser.name} ?
                    </Text>
                </Dialog>
            )}

            <Table.Head>
                <Table.TextHeaderCell>Name</Table.TextHeaderCell>

                <Table.TextHeaderCell>Action</Table.TextHeaderCell>
            </Table.Head>

            <Table.Body>
                {databaseUsers.map(user => (
                    <Table.Row key={user.id}>
                        <Table.TextCell>{user.name}</Table.TextCell>
                        <Table.Cell>
                            {user.is_ready ? (
                                <React.Fragment>
                                    <IconButton
                                        icon="trash"
                                        intent="danger"
                                        onClick={() => setDeletingUser(user)}
                                    />
                                </React.Fragment>
                            ) : (
                                <LoaderIcon />
                            )}
                        </Table.Cell>
                    </Table.Row>
                ))}
                {databaseUsers.length === 0 && (
                    <Text marginTop={16} display="flex" justifyContent="center">
                        No database users to show.
                    </Text>
                )}
            </Table.Body>
        </React.Fragment>
    )
}

export default DatabaseUsers
