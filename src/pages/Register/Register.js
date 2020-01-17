import React from 'react'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import AuthNavbar from 'components/AuthNavbar'
import RegisterForm from 'components/RegisterForm'

const Register = ({ auth, history: { push } }) => {
    const [, setUser] = auth
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
            .post('/auth/register', form)
            .then(({ data }) => {
                setSubmitting(false)
                setUser(data)

                push('/')
            })
            .catch(({ response }) => {
                setSubmitting(false)
                response && response.data && setErrors(response.data.errors)
            })
    }

    return (
        <>
            <AuthNavbar link='/auth/login' linkText='Sign in here.' text='Already have an account ?' />
            <RegisterForm
                form={form}
                errors={errors}
                setValue={setValue}
                submitting={submitting}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default withAuth(Register)
