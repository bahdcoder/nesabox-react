import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import NetworkDetails from 'components/Network'

const Network = props => {
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

    const handleFormSubmit = () => {

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
        />
    )
}

export default Network
