import { css } from 'glamor'
import client from 'utils/axios'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import Container from 'components/Container'
import { withSocket, withAuth } from 'utils/hoc'
import { Route, Link as RouterLink } from 'react-router-dom'
import React, { useState, useEffect, useReducer } from 'react'
import { Small, Link, IconButton, toaster } from 'evergreen-ui'

const siteReducer = (site, action) => {
    if (action.type === 'SET_SITE') return action.payload

    return site
}

const SingleSiteAsync = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "Server-SingleSite-Apps" */ 'components/SingleSite'
        ),
    loading: Loader
})

const SiteSettingsAsync = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "Server-SingleSite-Settings" */ 'pages/SiteSettings'
        ),
    loading: Loader
})

const SiteSSLAsync = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "Server-SingleSite-Settings" */ 'pages/SiteSSL'
        ),
    loading: Loader
})

const SingleSite = props => {
    const [loading, setLoading] = useState(true)
    const [appType, setAppType] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [site, dispatchSite] = useReducer(siteReducer, null)
    const {
        echo,
        auth,
        server,
        location,
        history: { push },
        match
    } = props

    const setSite = site =>
        dispatchSite({
            type: 'SET_SITE',
            payload: site
        })

    useEffect(() => {
        client
            .get(`servers/${server.id}/sites/${match.params.site}`)
            .then(({ data }) => {
                setSite(data)

                setAppType(data.installing_repository ? 'git' : 'ghost')

                setLoading(false)
            })
            .catch(() => {
                push(`/servers/${server.id}`)

                toaster.danger('Site was not found.')
            })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const [user] = auth
        const [socket] = echo

        socket &&
            socket.private(`App.User.${user.id}`).notification(notification => {
                if (
                    notification.type ===
                    'App\\Notifications\\Sites\\SiteUpdated'
                ) {
                    setSite(notification.site)
                }
            })
    }, [echo, auth])

    const installGhost = () => {
        setSubmitting(true)

        client
            .post(`servers/${props.server.id}/sites/${site.id}/install-ghost`)
            .then(({ data }) => {
                setSite(data)

                setAppType(data.installing_repository ? 'git' : 'ghost')

                toaster.success('Ghost blog has been queued for deployment.')
            })
            .catch(() => {
                toaster.danger('Failed installing ghost blog.')
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return loading ? (
        <Loader />
    ) : (
        <React.Fragment>
            <PageTitle>
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    })}
                >
                    <Small
                        className={css({
                            textTransform: 'uppercase'
                        })}
                    >
                        {site.name}
                    </Small>

                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center'
                        })}
                    >
                        <Link
                            is={RouterLink}
                            textDecoration="none"
                            to={`/servers/${server.id}`}
                        >
                            <Small
                                className={css({
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.name}
                            </Small>
                        </Link>

                        <Small
                            className={css({
                                marginLeft: '20px',
                                marginRight: '20px',
                                textTransform: 'uppercase'
                            })}
                        >
                            {server.ip_address}
                        </Small>

                        <IconButton
                            is="a"
                            target="_blank"
                            marginLeft={16}
                            icon="arrow-right"
                            href={`http${
                                site.ssl_certificate_installed ? 's' : ''
                            }://${site.name}`}
                        />
                    </div>
                </div>
            </PageTitle>

            <SubNavbar
                items={[
                    {
                        label: 'Apps',
                        active:
                            location.pathname.search(/sites/) > -1 &&
                            location.pathname.search(/settings/) < 0 &&
                            location.pathname.search(/ssl/) < 0,
                        to: `${match.url}`
                    },
                    {
                        label: 'Settings',
                        active: location.pathname.search(/settings/) > -1,
                        to: `${match.url}/settings`
                    },
                    {
                        label: 'SSL',
                        active: location.pathname.search(/ssl/) > -1,
                        to: `${match.url}/ssl`
                    }
                ]}
            />

            {!site.is_ready && (
                <React.Fragment>
                    <Container>
                        <Loader />
                        <Small
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            Installing site
                        </Small>
                    </Container>
                </React.Fragment>
            )}

            {site.is_ready && (
                <Container>
                    <Route
                        exact
                        render={routerProps => (
                            <SingleSiteAsync
                                {...props}
                                site={site}
                                {...routerProps}
                                setSite={setSite}
                                appType={appType}
                                setAppType={setAppType}
                                submitting={submitting}
                                installGhost={installGhost}
                                setSubmitting={setSubmitting}
                            />
                        )}
                        path={match.url}
                    />

                    <Route
                        render={routerProps => (
                            <SiteSettingsAsync
                                {...props}
                                site={site}
                                {...routerProps}
                                setSite={setSite}
                            />
                        )}
                        path={`${match.url}/settings`}
                    />

                    <Route
                        render={routerProps => (
                            <SiteSSLAsync
                                {...props}
                                site={site}
                                {...routerProps}
                                setSite={setSite}
                            />
                        )}
                        path={`${match.url}/ssl`}
                    />
                </Container>
            )}
        </React.Fragment>
    )
}

export default withAuth(withSocket(SingleSite))
