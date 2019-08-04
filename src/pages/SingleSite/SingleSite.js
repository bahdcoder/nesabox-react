import { css } from 'glamor'
import client from 'utils/axios'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import { toaster } from 'evergreen-ui'
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import Container from 'components/Container'
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
    const [appType, setAppType] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const site = props.server.sites.find(
        site => site.id === props.match.params.site
    )

    useEffect(() => {
        if (site) {
            setAppType(site.installing_repository ? 'git' : 'ghost')
        }
    }, [site])

    const installGhost = () => {
        setSubmitting(true)

        client
            .post(`servers/${props.server.id}/sites/${site.id}/install-ghost`)
            .then(({ data }) => {
                props.setServer(data)

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
            {!site && <Redirect to={`/servers/${props.server.id}`} />}

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
                            <Link
                                is="a"
                                target="_blank"
                                textDecoration="none"
                                href={`http://${site.name}`}
                            >
                                <Small
                                    className={css({
                                        textTransform: 'uppercase'
                                    })}
                                >
                                    {site.name}
                                </Small>
                            </Link>

                            <div
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center'
                                })}
                            >
                                <Link
                                    is={RouterLink}
                                    textDecoration="none"
                                    to={`/servers/${props.server.id}`}
                                >
                                    <Small
                                        className={css({
                                            textTransform: 'uppercase'
                                        })}
                                    >
                                        {props.server.name}
                                    </Small>
                                </Link>

                                <IconButton
                                    is="a"
                                    target="_blank"
                                    marginLeft={16}
                                    icon="arrow-right"
                                    href={`https://${site.nesabox_domain}`}
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
                                props.location.pathname.search(/settings/) < 0,
                            to: `${props.match.url}`
                        },
                        {
                            label: 'Settings',
                            active:
                                props.location.pathname.search(/settings/) > -1,
                            to: `${props.match.url}/settings`
                        }
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

export default SingleSite
