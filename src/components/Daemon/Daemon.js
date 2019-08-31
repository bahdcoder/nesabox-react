import React from 'react'
import { css } from 'glamor'
import Logs from 'components/Logs'
import Section from 'components/Section'
import EmptySet from 'components/EmptySet'
import LoaderIcon from 'components/LoaderIcon'
import {
    SideSheet,
    TextInputField,
    Pane,
    Button,
    Table,
    Heading,
    withTheme,
    IconButton,
    Dialog,
    Text
} from 'evergreen-ui'

import styles from './Daemon.css'

const Daemon = ({
    form,
    theme,
    server,
    errors,
    setValue,
    submitting,
    outputDialog,
    addingDaemon,
    deleteDaemon,
    restartDaemon,
    runningCommand,
    setOutputDialog,
    setAddingDaemon,
    getDaemonStatus,
    handleFormSubmit
}) => {
    return (
        <Section
            title="Daemons"
            description="Nesabox will configure Supervisor to make sure the script stays running. For example, you could start a daemon to keep a queue worker running."
        >
            {server.daemons.length === 0 && (
                <EmptySet
                    buttonLabel="Add new daemon"
                    heading="There are no daemons running on this server yet."
                    handleAction={() => setAddingDaemon(true)}
                />
            )}

            {server.daemons.length > 0 && (
                <React.Fragment>
                    <header className={css(styles.header)}>
                        <Heading>Active Daemons</Heading>

                        <Button onClick={() => setAddingDaemon(true)}>
                            Add
                        </Button>
                    </header>

                    <div className={css(styles.table)}>
                        <Table>
                            <Table.Head backgroundColor={'transparent'}>
                                <Table.TextHeaderCell
                                    paddingLeft={0}
                                    flex={'1 0 20%'}
                                >
                                    Command
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    User
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Processes
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Status
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Restart
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell></Table.TextHeaderCell>
                            </Table.Head>
                            <Table.Body>
                                {server.daemons.map(daemon => (
                                    <Table.Row
                                        key={daemon.id}
                                        borderBottom={'none'}
                                    >
                                        <Table.TextCell
                                            paddingLeft={0}
                                            flex={'1 0 20%'}
                                        >
                                            <code
                                                className={css({
                                                    color:
                                                        theme.palette.red.dark
                                                })}
                                            >
                                                {daemon.command}
                                            </code>
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {daemon.user}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {daemon.processes}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {((runningCommand &&
                                                runningCommand.id !==
                                                    daemon.id) ||
                                                !runningCommand) &&
                                                daemon.isReady && (
                                                    <IconButton
                                                        icon="pulse"
                                                        onClick={() =>
                                                            getDaemonStatus(
                                                                daemon
                                                            )
                                                        }
                                                    />
                                                )}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {((runningCommand &&
                                                runningCommand.id !==
                                                    daemon.id) ||
                                                !runningCommand) &&
                                                daemon.isReady && (
                                                    <IconButton
                                                        icon="social-media"
                                                        onClick={() =>
                                                            restartDaemon(
                                                                daemon
                                                            )
                                                        }
                                                    />
                                                )}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {((runningCommand &&
                                                runningCommand.id !==
                                                    daemon.id) ||
                                                !runningCommand) &&
                                            daemon.isReady ? (
                                                <IconButton
                                                    icon="trash"
                                                    intent="danger"
                                                    onClick={() =>
                                                        deleteDaemon(daemon)
                                                    }
                                                />
                                            ) : (
                                                <LoaderIcon />
                                            )}
                                        </Table.TextCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </React.Fragment>
            )}

            <SideSheet
                isShown={addingDaemon}
                onCloseComplete={() => setAddingDaemon(false)}
            >
                <Pane width={'100%'} padding={40}>
                    <React.Fragment>
                        <form onSubmit={handleFormSubmit}>
                            <TextInputField
                                required
                                name="command"
                                label="Command"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.command}
                                placeholder={'node app.js'}
                                isInvalid={!!errors.command}
                                validationMessage={errors.command}
                                onChange={e =>
                                    setValue('command', e.target.value)
                                }
                            />

                            <TextInputField
                                required
                                name="user"
                                label="User"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.user}
                                placeholder={'node app.js'}
                                isInvalid={!!errors.user}
                                validationMessage={errors.user}
                                onChange={e => setValue('user', e.target.value)}
                            />

                            <TextInputField
                                required
                                type="number"
                                name="processes"
                                inputHeight={40}
                                label="Processes"
                                inputWidth="100%"
                                value={form.processes}
                                placeholder={'node app.js'}
                                isInvalid={!!errors.processes}
                                validationMessage={errors.processes}
                                onChange={e =>
                                    setValue('processes', e.target.value)
                                }
                            />

                            <TextInputField
                                name="directory"
                                label="Directory"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.directory}
                                placeholder={'/home/nesa/app.domain.com'}
                                isInvalid={!!errors.directory}
                                validationMessage={errors.directory}
                                onChange={e =>
                                    setValue('directory', e.target.value)
                                }
                            />

                            <Button
                                type="submit"
                                marginTop={32}
                                appearance="primary"
                                intent="success"
                                isLoading={submitting}
                            >
                                Add Daemon
                            </Button>
                        </form>
                    </React.Fragment>
                </Pane>
            </SideSheet>

            {outputDialog && (
                <Dialog
                    isShown={true}
                    hasFooter={false}
                    contentContainerProps={{
                        style: {
                            padding: '0px'
                        }
                    }}
                    title={`${outputDialog.title} (${outputDialog.daemon.slug})`}
                    onCloseComplete={() => setOutputDialog(null)}
                >
                    <Text display="block" width="100%" marginBottom={8}>
                        Command: {outputDialog.daemon.command}
                    </Text>
                    <Logs logs={outputDialog.content} />

                    <Pane borderTop="muted" clearfix>
                        <Pane padding={16} float="right">
                            <Button
                                tabIndex={0}
                                onClick={() => setOutputDialog(null)}
                            >
                                Close
                            </Button>
                        </Pane>
                    </Pane>
                </Dialog>
            )}
        </Section>
    )
}

export default withTheme(Daemon)
