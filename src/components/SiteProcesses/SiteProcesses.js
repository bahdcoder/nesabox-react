import Ace from 'react-ace'
import { css } from 'glamor'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import React, { useState, useEffect, useReducer } from 'react'
import {
    withTheme,
    Popover,
    Menu,
    Button,
    Small,
    Pane,
    SideSheet,
    TextInputField,
    IconButton,
    Dialog,
    Text,
    toaster
} from 'evergreen-ui'

import 'brace/mode/sh'
import 'brace/theme/tomorrow'

const logsReducer = (logs, action) => {
    switch (action.type) {
        case 'LOGS_RECEIVED':
            return {
                ...logs,
                [action.value]: action.payload
            }
        default:
            return logs
    }
}

const SiteProcesses = ({ theme, site, setSite, server, auth }) => {
    const [user] = auth
    const [logs, setLogs] = useReducer(logsReducer, {})
    const [deletingProcess, setDeletingProcess] = useState(false)
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        command: ''
    })

    const [addingProcess, setAddingProcess] = useState(false)
    const filePaths = site.pm2_processes
        .map(process => `${process.value} `)
        .join(' ')
    const [selectedProcess, setSelectedProcess] = useState(
        site.pm2_processes[0] || null
    )

    useEffect(() => {
        const io = window.io(`${server.log_watcher_site}`)

        io.emit(`subscribe`, {
            access_token: user.access_token,
            filePaths
        })

        site.pm2_processes.forEach(process => {
            io.on(`${process.value}`, payload => {
                setLogs({
                    ...logs,
                    type: 'LOGS_RECEIVED',
                    value: process.value,
                    payload
                })
            })
        })

        return () => {
            io.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [site])

    console.log('>>>>>>>>', console.log(Object.keys(logs)))
    const handleFormSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post(`/servers/${server.id}/sites/${site.id}/pm2-processes`, form)
            .then(({ data }) => {
                setSite(data)

                resetForm()

                setAddingProcess(false)

                toaster.success('Pm2 process added.')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.errors &&
                    setErrors(response.data.errors)
                response &&
                    response.data &&
                    toaster.danger(response.data.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const deleteProcess = () => {
        setSubmitting(true)

        client
            .delete(
                `/servers/${server.id}/sites/${site.id}/pm2-processes/${selectedProcess.id}`
            )
            .then(({ data }) => {
                setSite(data)

                toaster.success('PM2 process queued for deletion.')
            })
            .finally(() => {
                setDeletingProcess(false)

                setSubmitting(false)
            })
    }

    return (
        <React.Fragment>
            <div
                {...css({
                    marginTop: 16,
                    display: 'flex',
                    marginBottom: 16,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                })}
            >
                <Small>Application logs</Small>
                <div
                    {...css({
                        display: 'flex'
                    })}
                >
                    <Button
                        onClick={() => setAddingProcess(true)}
                        appearance="primary"
                        intent="success"
                        marginRight={8}
                    >
                        Add Pm2 process
                    </Button>
                    {selectedProcess && (
                        <Popover
                            content={
                                <Menu>
                                    <Menu.OptionsGroup
                                        options={site.pm2_processes}
                                        selected={
                                            selectedProcess
                                                ? selectedProcess.value
                                                : null
                                        }
                                        onChange={pm2Process =>
                                            setSelectedProcess(
                                                site.pm2_processes.find(
                                                    p => p.value === pm2Process
                                                )
                                            )
                                        }
                                    />
                                </Menu>
                            }
                        >
                            <Button>
                                {selectedProcess
                                    ? selectedProcess.label
                                    : 'Select a process'}
                            </Button>
                        </Popover>
                    )}

                    {selectedProcess && selectedProcess.deletable && (
                        <IconButton
                            icon="trash"
                            marginLeft={8}
                            intent="danger"
                            onClick={() => setDeletingProcess(true)}
                        />
                    )}
                </div>
            </div>
            <div
                className={css({
                    padding: 8,
                    marginTop: 16,
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    border: `1px solid ${theme.palette.neutral.light}`
                })}
            >
                {!selectedProcess && <Small>No process selected.</Small>}
                {selectedProcess && (
                    <Ace
                        readOnly
                        mode="sh"
                        width="100%"
                        theme="tomorrow"
                        showGutter={false}
                        name="deployment-logs"
                        showPrintMargin={false}
                        value={logs[selectedProcess.value]}
                        editorProps={{
                            showGutter: false,
                            showLineNumbers: false,
                            maxLines: Infinity
                        }}
                    />
                )}
            </div>

            <SideSheet
                isShown={addingProcess}
                onCloseComplete={() => setAddingProcess(false)}
            >
                <Pane width={'100%'} padding={40}>
                    <React.Fragment>
                        <form onSubmit={handleFormSubmit}>
                            <TextInputField
                                required
                                name="name"
                                label="Name"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.name}
                                isInvalid={!!errors.name}
                                placeholder={'Queue worker'}
                                validationMessage={errors.name}
                                onChange={e => setValue('name', e.target.value)}
                            />

                            <TextInputField
                                required
                                name="command"
                                label="Command"
                                inputWidth="100%"
                                inputHeight={40}
                                value={form.command}
                                placeholder={'queue:worker'}
                                isInvalid={!!errors.command}
                                validationMessage={errors.command}
                                onChange={e =>
                                    setValue('command', e.target.value)
                                }
                                hint={
                                    'This is the package.json script used to start this process. Everytime your application is deployed, this script command would be started with PM2. Once added, you can monitor the logs for this process from the processes dashboard.'
                                }
                            />

                            <Button
                                type="submit"
                                marginTop={8}
                                intent="success"
                                appearance="primary"
                                isLoading={submitting}
                            >
                                Add PM2 process
                            </Button>
                        </form>
                    </React.Fragment>
                </Pane>
            </SideSheet>

            <Dialog
                intent="danger"
                isShown={deletingProcess}
                onConfirm={deleteProcess}
                confirmLabel="Delete PM2 Process"
                onCloseComplete={() => setDeletingProcess(false)}
                title={`Delete PM2 process - ${selectedProcess &&
                    selectedProcess.label}`}
            >
                <Text>
                    Are you sure you want to delete this Pm2 process ? This
                    process would be deleted on the server too. ?
                </Text>
            </Dialog>
        </React.Fragment>
    )
}

export default withAuth(withTheme(SiteProcesses))
