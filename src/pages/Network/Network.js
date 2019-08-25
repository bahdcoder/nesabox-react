import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import NetworkDetails from 'components/Network'

const Network = props => {
    const { server, setServer } = props
    const [addingRule, setAddingRule] = useState(false)
    const [deletingRule, setDeletingRule] = useState(false)

    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        port: '',
        from: ''
    })

    const handleFormSubmit = e => {
        setSubmitting(true)
        e.preventDefault()

        client.post(`/servers/${server.id}/firewall-rules`, {
            ...form,
            from: form.from.split(',')
        })
            .then(({ data }) => {
                setServer(data)
            })
            .catch(({ response }) => {
                response && response.data && response.data.errors && setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <NetworkDetails
            {...props}
            form={form}
            errors={errors}
            setValue={setValue}
            resetForm={resetForm}
            addingRule={addingRule}
            submitting={submitting}
            deletingRule={deletingRule}
            setAddingRule={setAddingRule}
            setDeletingRule={setDeletingRule}
            handleFormSubmit={handleFormSubmit}
        />
    )
}

export default Network
