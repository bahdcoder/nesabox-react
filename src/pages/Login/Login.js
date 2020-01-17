import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import QueryString from 'query-string'
import { toaster } from 'evergreen-ui'
import React, { useEffect } from 'react'
import LoginForm from 'components/LoginForm'
import AuthNavbar from 'components/AuthNavbar'

const Login = ({ auth, history, location }) => {
    const [, setUser] = auth
    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        email: '',
        password: '',
        rememberMe: false
    })

    useEffect(() => {
        if (! location.state) return undefined

        const query = QueryString.parse(location.state.from.search)

        if (!query.code) return

        setSubmitting(true)

        client
            .post(
                `/auth/github/callback?code=${query.code}`,
            )
            .then(({ data }) => {
                setUser(data)

                history.push(`/`)
            })
            .catch(() => {
                toaster.danger(`Failed to authenticate with github.`)

                setSubmitting(false)

                window.history.replaceState({}, '/auth/login')
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post('/auth/login', form)
            .then(({ data }) => {
                setSubmitting(false)
                setUser(data)
            })
            .catch(({ response }) => {
                setSubmitting(false)
                response && response.data && setErrors(response.data.errors)
            })
    }

    const redirectToProvider = () => {
        setSubmitting(true)

        client
            .get(`/settings/source-control/github`)
            .then(({ data }) => {
                window.location.href = data.url
            })
            .catch(() => {
                setSubmitting(false)

                toaster.danger('Oops. Something went wrong. Please contact us and we\'ll fix this.')
            })
    }

    return (
        <>
            <AuthNavbar link='/auth/register' linkText='Create a free account' text='New to Nesabox?' />
            <LoginForm
                form={form}
                errors={errors}
                setValue={setValue}
                submitting={submitting}
                handleSubmit={handleSubmit}
                redirectToProvider={redirectToProvider}
            />
        </>
    )
}

export default withAuth(Login)
