import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import React, { useEffect } from 'react'
import RegisterForm from 'components/RegisterForm'

const Register = ({ auth, history: { push } }) => {
    const [user, setUser] = auth
    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post('/register', form)
            .then(({ data }) => {
                setSubmitting(false)
                setUser(data)

                push('/dashboard')
            })
            .catch(({ response }) => {
                setSubmitting(false)
                response && response.data && setErrors(response.data.errors)
            })
    }

    return (
        <RegisterForm
            form={form}
            errors={errors}
            setValue={setValue}
            submitting={submitting}
            handleSubmit={handleSubmit}
        />
    )
}

export default withAuth(Register)
