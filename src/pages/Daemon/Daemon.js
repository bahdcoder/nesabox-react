import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import DaemonDetails from 'components/Daemon'

const Daemon = props => {
    const [outputDialog, setOutputDialog] = useState(null)
    const [addingDaemon, setAddingDaemon] = useState(false)
    const [runningCommand, setRunningCommand] = useState(false)

    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        command: '',
        directory: '',
        user: 'root',
        processes: 1
    })

    const getDaemonStatus = daemon => {
        setRunningCommand(daemon)
        client.get(`/servers/${props.server.id}/daemons/${daemon.id}/status`)
            .then(({ data }) => {
                setRunningCommand(null)

                setOutputDialog({
                    title: 'Daemon status',
                    content: data.data,
                    daemon
                })
            })
            .catch(({ response }) => {
                toaster.danger('Failed to load daemon status.')
            })
    }

    const deleteDaemon = daemon => {
        setRunningCommand(daemon)

        client.delete(`/servers/${props.server.id}/daemons/${daemon.id}`)
            .then(({ data }) => {
                setRunningCommand(null)

                props.setServer(data)
                toaster.success('Daemon deleted.')
            })
            .catch(({ response }) => {
                toaster.danger('Failed to delete daemon.')
            })
    }

    const restartDaemon = daemon => {
        setRunningCommand(daemon)

        client.post(`/servers/${props.server.id}/daemons/${daemon.id}/restart`)
            .then(({ data }) => {
                setRunningCommand(null)

                setOutputDialog({
                    title: 'Daemon restart output',
                    content: data.data,
                    daemon
                })
                toaster.success('Daemon restarted.')
            })
            .catch(({ response }) => {
                toaster.danger('Failed to restart daemon.')
            })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        setSubmitting(true)

        client
            .post(`/servers/${props.server.id}/daemons`, form)
            .then(({ data }) => {
                resetForm()
                setAddingDaemon(false)

                props.setServer(data)
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <DaemonDetails
            {...props}
            form={form}
            errors={errors}
            setValue={setValue}
            submitting={submitting}
            outputDialog={outputDialog}
            addingDaemon={addingDaemon}
            deleteDaemon={deleteDaemon}
            restartDaemon={restartDaemon}
            runningCommand={runningCommand}
            setOutputDialog={setOutputDialog}
            setAddingDaemon={setAddingDaemon}
            getDaemonStatus={getDaemonStatus}
            handleFormSubmit={handleFormSubmit}
        />
    )
}

export default Daemon
