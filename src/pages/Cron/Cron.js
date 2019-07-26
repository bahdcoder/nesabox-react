import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import CronDetails from 'components/Cron'

const Cron = props => {
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        cron: '',
        command: '',
        user: 'nesa',
        'cron-expression-1': '*',
        'cron-expression-2': '*',
        'cron-expression-3': '*',
        'cron-expression-4': '*',
        'cron-expression-5': '*',
        frequency: 'everyMinute'
    })

    const [dialog, setDialog] = useState(false)
    const [runningCommand, setRunningCommand] = useState(false)

    const frequencies = [
        {
            label: 'Every Minute',
            value: 'everyMinute'
        },
        {
            label: 'Every Five Minutes',
            value: 'everyFiveMinutes'
        },
        {
            label: 'Every Ten Minutes',
            value: 'everyTenMinutes'
        },
        {
            label: 'Hourly',
            value: 'hourly'
        },
        {
            label: 'Nightly',
            value: 'daily'
        },
        {
            label: 'Weekly',
            value: 'weekly'
        },
        {
            label: 'Monthly',
            value: 'monthly'
        },
        {
            label: 'Custom cron',
            value: 'custom'
        }
    ]

    const [addingJob, setAddingJob] = useState(false)

    const handleFormSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        let data = {
            ...form,
            cron: `${form['cron-expression-1']} ${form['cron-expression-2']} ${
                form['cron-expression-3']
            } ${form['cron-expression-4']} ${form['cron-expression-5']}`
        }

        delete data['cron-expression-1']
        delete data['cron-expression-2']
        delete data['cron-expression-3']
        delete data['cron-expression-4']
        delete data['cron-expression-5']

        client
            .post(`/servers/${props.server.id}/cron-jobs`, data)
            .then(({ data }) => {
                setAddingJob(false)

                resetForm()

                props.setServer(data)

                toaster.success('Cron job added to server.')
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)

                toaster.danger('Failed to add cron job.')
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const deleteJob = job => {
        setRunningCommand(job)

        client
            .delete(`/servers/${props.server.id}/cron-jobs/${job.id}`)
            .then(({ data }) => {
                setRunningCommand(null)

                props.setServer(data)

                toaster.success('Cron job deleted.')
            })
            .catch(() => {
                setRunningCommand(null)

                toaster.danger('Failed deleting cron job.')
            })
    }

    const getJobLog = job => {
        setRunningCommand(job)

        client
            .post(`/servers/${props.server.id}/cron-jobs/${job.id}/log`)
            .then(({ data }) => {
                setDialog({
                    job,
                    title: `Job output (${job.slug})`,
                    content: data
                })

                setRunningCommand(null)
            })
            .catch(() => {
                setRunningCommand(false)

                toaster.danger('Failed fetching job log.')
            })
    }

    return (
        <CronDetails
            {...props}
            form={form}
            dialog={dialog}
            errors={errors}
            setValue={setValue}
            deleteJob={deleteJob}
            setDialog={setDialog}
            addingJob={addingJob}
            getJobLog={getJobLog}
            submitting={submitting}
            frequencies={frequencies}
            setAddingJob={setAddingJob}
            runningCommand={runningCommand}
            handleFormSubmit={handleFormSubmit}
            setRunningCommand={setRunningCommand}
        />
    )
}

export default Cron
