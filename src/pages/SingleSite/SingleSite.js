import { css } from 'glamor'
import client from 'utils/axios'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import { toaster } from 'evergreen-ui'
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import Container from 'components/Container'
import { withSocket, withAuth } from 'utils/hoc'
import React, { useState, useEffect } from 'react'
import { Small, Link, IconButton } from 'evergreen-ui'
import { Route, Link as RouterLink, Redirect } from 'react-router-dom'

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

const SingleSite = props => {
    const { echo, auth, server, setServer } = props

    const [user] = auth
    const [appType, setAppType] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const site = server.sites.find(site => site.id === props.match.params.site)

    const setSite = site => {
        setServer({
            ...server,
            sites: server.sites.map(oldSite =>
                oldSite.id !== site.id ? oldSite : site
            )
        })
    }

    useEffect(() => {
        if (site) {
            setAppType(site.installing_repository ? 'git' : 'ghost')
        }
    }, [site])

    useEffect(() => {
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

        // return () =>
        //     socket && socket.private(`App.User.${user.id}`).unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [echo, user])

    const installGhost = () => {
        setSubmitting(true)

        client
            .post(`servers/${props.server.id}/sites/${site.id}/install-ghost`)
            .then(({ data }) => {
                setSite(data)

                toaster.success('Ghost blog has been queued for deployment.')
            })
            .catch(() => {
                toaster.danger('Failed installing ghost blog.')
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <React.Fragment>
            {!site && <Redirect to={`/servers/${server.id}`} />}

            {site && (
                <PageTitle>
                    {site && (
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
                                        textTransform: 'uppercase',
                                    })}
                                >
                                    {server.ip_address}
                                </Small>

                                <IconButton
                                    is="a"
                                    target="_blank"
                                    marginLeft={16}
                                    icon="arrow-right"
                                    href={`http://${site.name}`}
                                />
                            </div>
                        </div>
                    )}
                </PageTitle>
            )}
            {site && (
                <SubNavbar
                    items={[
                        {
                            label: 'Apps',
                            active:
                                props.location.pathname.search(/sites/) > -1 &&
                                props.location.pathname.search(/settings/) <
                                    0 &&
                                props.location.pathname.search(/processes/) < 0,
                            to: `${props.match.url}`
                        },
                        {
                            label: 'Settings',
                            active:
                                props.location.pathname.search(/settings/) > -1,
                            to: `${props.match.url}/settings`
                        },
                    ]}
                />
            )}

            {site && !site.is_ready && (
                <React.Fragment>
                    <Container>
                        <Loader />
                        <Small
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            Setting up site
                        </Small>
                    </Container>
                </React.Fragment>
            )}

            {site && site.is_ready && (
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
                        path={props.match.url}
                    />

                    <Route
                        render={routerProps => (
                            <SiteSettingsAsync
                                {...props}
                                site={site}
                                {...routerProps}
                            />
                        )}
                        path={`${props.match.url}/settings`}
                    />
                </Container>
            )}
        </React.Fragment>
    )
}

export default withAuth(withSocket(SingleSite))
