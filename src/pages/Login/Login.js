import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import React, { useEffect } from 'react'
import LoginForm from 'components/LoginForm'

const Login = ({ auth, history: { push } }) => {
    const [user, setUser] = auth
    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        email: '',
        password: ''
    })

    useEffect(() => {
        user && push('/dashboard')
    }, [user, push])

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post('/login', form)
            .then(({ data }) => {
                setSubmitting(false)
                setUser(data)
            })
            .catch(({ response }) => {
                setSubmitting(false)
                response && response.data && setErrors(response.data.errors)
            })
    }

    return (
        <LoginForm
            form={form}
            errors={errors}
            setValue={setValue}
            submitting={submitting}
            handleSubmit={handleSubmit}
        />
    )
}

export default withAuth(Login)
