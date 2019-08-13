import React from 'react'
import { css } from 'glamor'
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
    Text
} from 'evergreen-ui'
import Section from 'components/Section'
import EmptySet from 'components/EmptySet'

import styles from './Databases.css'

const Databases = ({
    form,
    theme,
    server,
    errors,
    setValue,
    submitting,
    createNewUser,
    deleteDatabase,
    addingDatabase,
    handleFormSubmit,
    setCreateNewUser,
    deletingDatabase,
    setAddingDatabase,
    setDeletingDatabase
}) => {
    return (
        <React.Fragment>
            {server.databases.map(databaseType => {
                const databasesList = server[`${databaseType}_databases`]

                return (
                    <Section
                        key={databaseType}
                        title={`${databaseType} databases`}
                        description={`Here, you can manage your ${databaseType} databases and database users.`}
                    >
                        {server[`${databaseType}_databases`].length === 0 && (
                            <EmptySet
                                buttonLabel={`Add ${databaseType} database`}
                                heading={`There are no ${databaseType} databases yet.`}
                                handleAction={() =>
                                    setAddingDatabase({
                                        ...addingDatabase,
                                        [databaseType]: true
                                    })
                                }
                            />
                        )}
                        {deletingDatabase && (
                            <Dialog
                                isShown={true}
                                hasFooter={false}
                                title={'Delete database'}
                                onCloseComplete={() =>
                                    setDeletingDatabase(null)
                                }
                            >
                                <Pane marginBottom={16}>
                                    <Text textAlign="center" display={'block'}>
                                        Are you sure you want to delete this
                                        database ?
                                    </Text>
                                </Pane>

                                <Pane padding={8} float="right">
                                    <Button
                                        tabIndex={0}
                                        type="button"
                                        marginRight={8}
                                        onClick={() =>
                                            setDeletingDatabase(null)
                                        }
                                    >
                                        Close
                                    </Button>

                                    <Button
                                        tabIndex={0}
                                        type="button"
                                        marginRight={8}
                                        intent="danger"
                                        intent="success"
                                        appearance="primary"
                                        onClick={() => deleteDatabase(false)}
                                        isLoading={
                                            submitting &&
                                            submitting.delete_user === false
                                        }
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        tabIndex={0}
                                        type="button"
                                        intent="danger"
                                        appearance="primary"
                                        onClick={() => deleteDatabase(true)}
                                        isLoading={
                                            submitting &&
                                            submitting.delete_user === true
                                        }
                                    >
                                        Delete database and user -{' '}
                                        {deletingDatabase.user}
                                    </Button>
                                </Pane>
                            </Dialog>
                        )}

                        {databasesList.length > 0 && (
                            <React.Fragment>
                                <header className={css(styles.header)}>
                                    <Heading textTransform="capitalize">
                                        Available databases
                                    </Heading>

                                    <Button
                                        onClick={() =>
                                            setAddingDatabase({
                                                ...addingDatabase,
                                                [databaseType]: true
                                            })
                                        }
                                    >
                                        Add
                                    </Button>
                                </header>

                                <div className={css(styles.table)}>
                                    <Table>
                                        <Table.Head
                                            backgroundColor={'transparent'}
                                        >
                                            <Table.TextHeaderCell
                                                paddingLeft={0}
                                            >
                                                Name
                                            </Table.TextHeaderCell>

                                            <Table.TextHeaderCell>
                                                User
                                            </Table.TextHeaderCell>

                                            <Table.TextHeaderCell>
                                                Delete
                                            </Table.TextHeaderCell>
                                        </Table.Head>
                                        <Table.Body>
                                            {databasesList.map(database => (
                                                <Table.Row
                                                    key={database.id}
                                                    borderBottom={'none'}
                                                >
                                                    <Table.TextCell
                                                        paddingLeft={0}
                                                    >
                                                        {database.name}
                                                    </Table.TextCell>

                                                    <Table.TextCell>
                                                        {database.user}
                                                    </Table.TextCell>

                                                    <Table.TextCell>
                                                        <IconButton
                                                            icon="trash"
                                                            intent="danger"
                                                            onClick={() =>
                                                                setDeletingDatabase(
                                                                    database
                                                                )
                                                            }
                                                        />
                                                    </Table.TextCell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>
                            </React.Fragment>
                        )}

                        <SideSheet
                            isShown={addingDatabase[databaseType]}
                            onCloseComplete={() =>
                                setAddingDatabase({
                                    ...addingDatabase,
                                    [databaseType]: false
                                })
                            }
                        >
                            <Pane width={'100%'} padding={40}>
                                <React.Fragment>
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault()

                                            handleFormSubmit(databaseType)
                                        }}
                                    >
                                        <TextInputField
                                            required
                                            name="name"
                                            label="Name"
                                            inputWidth="100%"
                                            inputHeight={40}
                                            value={form.name}
                                            isInvalid={!!errors.name}
                                            validationMessage={errors.name}
                                            onChange={e =>
                                                setValue('name', e.target.value)
                                            }
                                        />

                                        <div className={css(styles.switch)}>
                                            <Switch
                                                disabled={
                                                    databaseType === 'mongodb'
                                                }
                                                checked={
                                                    createNewUser[databaseType]
                                                }
                                                onChange={e => {
                                                    setCreateNewUser({
                                                        ...createNewUser,
                                                        [databaseType]: !createNewUser[
                                                            databaseType
                                                        ]
                                                    })

                                                    setValue(
                                                        'user',
                                                        createNewUser[
                                                            databaseType
                                                        ]
                                                            ? 'nesa'
                                                            : ''
                                                    )
                                                }}
                                            />

                                            <Label
                                                className={css(
                                                    styles.switchLabel
                                                )}
                                            >
                                                Create new user
                                            </Label>
                                        </div>

                                        {createNewUser[databaseType] && (
                                            <React.Fragment>
                                                <TextInputField
                                                    required
                                                    name="user"
                                                    label="User"
                                                    inputWidth="100%"
                                                    inputHeight={40}
                                                    value={form.user}
                                                    isInvalid={!!errors.user}
                                                    validationMessage={
                                                        errors.user
                                                    }
                                                    onChange={e =>
                                                        setValue(
                                                            'user',
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
                                                    value={form.password}
                                                    isInvalid={
                                                        !!errors.password
                                                    }
                                                    validationMessage={
                                                        errors.password
                                                    }
                                                    onChange={e =>
                                                        setValue(
                                                            'password',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </React.Fragment>
                                        )}

                                        <Button
                                            type="submit"
                                            marginTop={8}
                                            intent="success"
                                            appearance="primary"
                                            isLoading={submitting}
                                        >
                                            Add database
                                        </Button>
                                    </form>
                                </React.Fragment>
                            </Pane>
                        </SideSheet>
                    </Section>
                )
            })}
        </React.Fragment>
    )
}

export default withTheme(Databases)
