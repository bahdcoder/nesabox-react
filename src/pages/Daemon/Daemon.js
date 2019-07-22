import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import DaemonDetails from 'components/Daemon'

const Daemon = props => {
    const [addingDaemon, setAddingDaemon] = useState(false)

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

    const handleFormSubmit = e => {
        e.preventDefault()

        console.log(form)
        client
            .post(`/servers/${props.server.id}/daemons`, form)
            .then(() => {})
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)
            })
    }

    return (
        <DaemonDetails
            {...props}
            form={form}
            errors={errors}
            setValue={setValue}
            submitting={submitting}
            addingDaemon={addingDaemon}
            setAddingDaemon={setAddingDaemon}
            handleFormSubmit={handleFormSubmit}
        />
    )
}

export default Daemon
