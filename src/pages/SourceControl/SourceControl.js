import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import QueryString from 'query-string'
import { toaster } from 'evergreen-ui'
import SourceControlForm from 'components/SourceControlForm'
import React, { useState, useEffect } from 'react'

const SourceControl = ({ auth, location, match, history }) => {
    const [user, setUser] = auth
    const [unlinking, setUnlinking] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        const query = QueryString.parse(location.search)

        if (!query.code) return

        if (!match.params.provider) return

        setIsRedirecting(match.params.provider)

        client
            .get(
                `/settings/source-control/${match.params.provider}/callback?code=${query.code}`
            )
            .then(({ data }) => {
                toaster.success(`Connected to ${match.params.provider}.`)

                setUser(data)
            })
            .catch(() => {
                toaster.danger(`Failed to connect to ${match.params.provider}.`)
            })
            .finally(() => {
                setIsRedirecting(false)

                history.push(`/account/applications`)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirectToProvider = provider => {
        setIsRedirecting(provider)

        client
            .get(`/settings/source-control/${provider}`)
            .then(({ data }) => {
                window.location.href = data.url
            })
            .catch(() => {
                setIsRedirecting(false)

                toaster.danger('Something went wrong. Please try again later.')
            })
    }

    const unlinkProvider = provider => {
        setUnlinking(provider)

        client
            .post(`/settings/source-control/${provider}/unlink`)
            .then(({ data }) => {
                setUser(data)

                toaster.success(`Provider ${provider} has been unlinked.`)
            })
            .catch(() => {
                toaster.danger(
                    `Failed to unlink ${provider}. Please try again later.`
                )
            })
            .finally(() => {
                setUnlinking(false)
            })
    }

    const providers = Object.keys(user.source_control).map(provider => ({
        name: provider,
        connected: user.source_control[provider],
        unlink: provider !== user.auth_provider
    }))

    return (
        <React.Fragment>
            <SourceControlForm
                providers={providers}
                unlinking={unlinking}
                isRedirecting={isRedirecting}
                unlinkProvider={unlinkProvider}
                redirectToProvider={redirectToProvider}
            />
        </React.Fragment>
    )
}

export default withAuth(SourceControl)
