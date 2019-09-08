import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import QueryString from 'query-string'
import { toaster } from 'evergreen-ui'
import LoginForm from 'components/LoginForm'
import React, { useEffect, useState } from 'react'

const Login = ({ auth, history, location }) => {
    const [, setUser] = auth
    const [submitting, setSubmitting] = useState(false)

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

                window.history.replaceState({}, '/authenticate')
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        <LoginForm
            submitting={submitting}
            redirectToProvider={redirectToProvider}
        />
    )
}

export default withAuth(Login)
