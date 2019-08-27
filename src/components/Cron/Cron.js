import React from 'react'
import { css } from 'glamor'
import Logs from 'components/Logs'
import Section from 'components/Section'
import EmptySet from 'components/EmptySet'
import {
    SideSheet,
    TextInputField,
    Label,
    TextInput,
    Pane,
    Button,
    Alert,
    Table,
    Heading,
    Icon,
    Link,
    withTheme,
    IconButton,
    Dialog,
    Text,
    RadioGroup,
    Small
} from 'evergreen-ui'

import styles from './Cron.css'

const Cron = ({
    form,
    theme,
    server,
    errors,
    dialog,
    setValue,
    submitting,
    addingJob,
    getJobLog,
    deleteJob,
    setDialog,
    frequencies,
    setAddingJob,
    runningCommand,
    handleFormSubmit
}) => {
    return (
        <Section
            title="Cron jobs"
            description="Nesabox will configure Supervisor to make sure the script stays running. For example, you could start a daemon to keep a queue worker running."
        >
            {server.jobs.length === 0 && (
                <EmptySet
                    buttonLabel="Schedule a new cron job"
                    heading="There are no cron jobs scheduled on this server yet."
                    handleAction={() => setAddingJob(true)}
                />
            )}

            {server.jobs.length > 0 && (
                <React.Fragment>
                    <header className={css(styles.header)}>
                        <Heading>Scheduled Cron Jobs</Heading>

                        <Button onClick={() => setAddingJob(true)}>Add</Button>
                    </header>

                    <div className={css(styles.table)}>
                        <Table>
                            <Table.Head backgroundColor={'transparent'}>
                                <Table.TextHeaderCell paddingLeft={0}>
                                    ID
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Frequency
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Cron
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    User
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Command
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Output
                                </Table.TextHeaderCell>

                                <Table.TextHeaderCell>
                                    Delete
                                </Table.TextHeaderCell>
                            </Table.Head>
                            <Table.Body>
                                {server.jobs.map(job => (
                                    <Table.Row
                                        key={job.id}
                                        borderBottom={'none'}
                                    >
                                        <Table.TextCell paddingLeft={0}>
                                            {job.slug}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {job.frequency}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {job.cron}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {job.user}
                                        </Table.TextCell>

                                        <Table.TextCell>
                                            <code
                                                className={css({
                                                    color:
                                                        theme.palette.red.dark
                                                })}
                                            >
                                                {job.command}
                                            </code>
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {((runningCommand &&
                                                runningCommand.id !== job.id) ||
                                                !runningCommand) &&
                                                job.isReady && (
                                                    <IconButton
                                                        icon="document"
                                                        onClick={() =>
                                                            getJobLog(job)
                                                        }
                                                    />
                                                )}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {((runningCommand &&
                                                runningCommand.id !== job.id) ||
                                                !runningCommand) &&
                                            job.isReady ? (
                                                <IconButton
                                                    icon="trash"
                                                    intent="danger"
                                                    onClick={() =>
                                                        deleteJob(job)
                                                    }
                                                />
                                            ) : (
                                                <Icon
                                                    marginLeft={8}
                                                    icon="social-media"
                                                    fill={theme.scales.blue.B9}
                                                    className="rotate animated infinite"
                                                />
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
                isShown={addingJob}
                onCloseComplete={() => setAddingJob(false)}
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
                                isInvalid={!!errors.command}
                                validationMessage={errors.command}
                                placeholder={
                                    'cd /home/nesa/api.nesabox.com  && npm run app:report'
                                }
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
                                isInvalid={!!errors.user}
                                validationMessage={errors.user}
                                onChange={e => setValue('user', e.target.value)}
                            />

                            <RadioGroup
                                size={16}
                                marginTop={40}
                                label="Frequency"
                                intent="success"
                                options={frequencies}
                                value={form.frequency}
                                onChange={frequency =>
                                    setValue('frequency', frequency)
                                }
                            />
                            {form.frequency === 'custom' && (
                                <React.Fragment>
                                    <Alert intent="none" marginTop={16}>
                                        You can use{' '}
                                        <Link
                                            is="a"
                                            href="http://www.cronmaker.com/"
                                            target="_blank"
                                        >
                                            this tool
                                        </Link>{' '}
                                        to easily generate a custom cron
                                        expression.
                                    </Alert>
                                    <Label
                                        marginTop={16}
                                        marginBottom={16}
                                        display={'inline-block'}
                                    >
                                        Cron Expression *
                                    </Label>
                                    <div className={css(styles.cron)}>
                                        {[1, 2, 3, 4, 5].map(item => (
                                            <TextInput
                                                key={item}
                                                width={'15%'}
                                                placeholder="*"
                                                marginRight={'5%'}
                                                name={`cron-expression-${item}`}
                                                value={
                                                    form[
                                                        `cron-expression-${item}`
                                                    ]
                                                }
                                                onChange={e =>
                                                    setValue(
                                                        `cron-expression-${item}`,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                    {errors.cron && (
                                        <Small
                                            marginTop={8}
                                            display="block"
                                            width={'100%'}
                                            color={theme.colors.intent.danger}
                                        >
                                            {errors.cron}
                                        </Small>
                                    )}
                                </React.Fragment>
                            )}

                            <Button
                                type="submit"
                                intent="success"
                                marginTop={16}
                                appearance="primary"
                                isLoading={submitting}
                            >
                                Schedule Job
                            </Button>
                        </form>
                    </React.Fragment>
                </Pane>
            </SideSheet>

            {dialog && (
                <Dialog
                    isShown={true}
                    hasFooter={false}
                    title={dialog.title}
                    onCloseComplete={() => setDialog(null)}
                >
                    <Text display="block" width="100%" marginBottom={8}>
                        Command: {dialog.job.command}
                    </Text>
                    <Logs logs={dialog.content} />

                    <Pane borderTop="muted" clearfix>
                        <Pane padding={16} float="right">
                            <Button
                                tabIndex={0}
                                onClick={() => setDialog(null)}
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

export default withTheme(Cron)
