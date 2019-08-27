import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
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

        client
            .post(`/servers/${server.id}/firewall-rules`, {
                ...form,
                from: form.from.split(',')
            })
            .then(({ data }) => {
                setServer(data)

                setAddingRule(false)

                toaster.success('Rule added.')
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

    const deleteRule = () => {
        setSubmitting(true)

        client
            .delete(`/servers/${server.id}/firewall-rules/${deletingRule.id}`)
            .then(({ data }) => {
                setServer(data)

                setDeletingRule(null)

                toaster.success('Rule deleted.')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
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
            deleteRule={deleteRule}
            deletingRule={deletingRule}
            setAddingRule={setAddingRule}
            setDeletingRule={setDeletingRule}
            handleFormSubmit={handleFormSubmit}
        />
    )
}

export default Network
