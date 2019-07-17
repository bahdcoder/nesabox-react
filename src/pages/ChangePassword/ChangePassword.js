import React from 'react'
import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import ChangePasswordForm from 'components/ChangePasswordForm'

const ChangePassword = () => {
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        new_password: '',
        current_password: '',
        new_password_confirmation: ''
    })

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        setErrors({})

        client
            .put('/me/password', form)
            .then(({ data }) => {
                toaster.success('Password has been changed.')

                setSubmitting(false)

                resetForm()
            })
            .catch(({ response }) => {
                setSubmitting(false)

                response &&
                    response.data &&
                    response.data.errors &&
                    setErrors(response.data.errors)
            })
    }

    return (
        <React.Fragment>
            <ChangePasswordForm
                form={form}
                errors={errors}
                setValue={setValue}
                submitting={submitting}
                handleSubmit={handleSubmit}
            />
        </React.Fragment>
    )
}

export default ChangePassword
