import React from 'react'
import { css } from 'glamor'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import Heading from 'components/Heading'
import Container from 'components/Container'
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import { Small, Link, IconButton } from 'evergreen-ui'
import ServerStatusIcon from 'components/ServerStatusIcon'
import { Route, Link as RouterLink } from 'react-router-dom'

const MetaAsync = Loadable({
    loader: () => import(/* webpackChunkName: "Server-Meta" */ 'pages/Meta'),
    loading: Loader
})

const DatabasesAsync = Loadable({
    loader: () =>
        import(/* webpackChunkName: "Server-Databases" */ 'pages/Databases'),
    loading: Loader
})

const ProcessesAsync = Loadable({
    loader: () =>
        import(/* webpackChunkName: "Server-Processes" */ 'pages/Processes'),
    loading: Loader
})

const SitesAsync = Loadable({
    loader: () => import(/* webpackChunkName: "Server-Sites" */ 'pages/Sites'),
    loading: Loader
})

const SingleSiteAsync = Loadable({
    loader: () =>
        import(/* webpackChunkName: "Server-Sites" */ 'pages/SingleSite'),
    loading: Loader
})

const getCurrentSite = ({ location, match, server }) => {
    if (!server) return null

    try {
        return server.sites.find(
            site => site.id === match.params.site || location.pathname.substr(match.url.length + 7)
        )
    } catch (e) {
        return null
    }
}

const ServerDetails = ({ server, location, match, setServer }) => {
    const isSitePath = location.pathname.search(/sites/) > 0
    const site = isSitePath ? getCurrentSite({ location, match, server }) : null

    return (
        <React.Fragment>
            <PageTitle>
                {!server && <Loader noPadding />}
                {server && !isSitePath && (
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        })}
                    >
                        <Heading>Server Details</Heading>

                        <div
                            className={css({
                                display: 'flex'
                            })}
                        >
                            <Small
                                className={css({
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.name}
                            </Small>
                            <Small
                                className={css({
                                    marginLeft: 24,
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.region}
                            </Small>
                            <Small
                                className={css({
                                    marginLeft: 24,
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.ip_address}
                            </Small>
                            <Small
                                className={css({
                                    marginLeft: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.status}{' '}
                                <ServerStatusIcon status={server.status} />
                            </Small>
                        </div>
                    </div>
                )}
                {server && isSitePath && site && (
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

                            <IconButton
                                marginLeft={16}
                                is="a"
                                href={`http://${site.name}`}
                                target="_blank"
                                icon="arrow-right"
                                intent="success"
                            />
                        </div>
                    </div>
                )}
            </PageTitle>

            {!isSitePath && (
                <SubNavbar
                    items={[
                        {
                            label: 'Sites',
                            active: match.isExact,
                            to: match.url
                        },
                        {
                            label: 'Databases',
                            active: location.pathname.search(/databases/) > -1,
                            to: `${match.url}/databases`
                        },
                        {
                            label: 'Processes',
                            active: location.pathname.search(/processes/) > -1,
                            to: `${match.url}/processes`
                        },
                        {
                            label: 'Monitoring',
                            active: location.pathname.search(/monitoring/) > -1,
                            to: `${match.url}/monitoring`
                        },
                        {
                            label: 'Meta',
                            active: location.pathname.search(/meta/) > -1,
                            to: `${match.url}/meta`
                        }
                    ]}
                />
            )}

            {isSitePath && site && (
                <SubNavbar
                    items={[
                        {
                            label: 'Apps',
                            active: location.pathname.search(/sites/) > -1 && location.pathname.search(/settings/) < 0,
                            to: `${match.url}/sites/${site.id}`
                        },
                        {
                            label: 'Settings',
                            active: location.pathname.search(/settings/) > -1,
                            to: `${match.url}/sites/${site.id}/settings`
                        }
                    ]}
                />
            )}

            {server && server.is_ready && (
                <React.Fragment>
                    <Route
                        exact
                        render={routerProps => (
                            <SitesAsync
                                server={server}
                                {...routerProps}
                                setServer={setServer}
                            />
                        )}
                        path={`${match.url}`}
                    />
                    <Container>
                        <Route
                            render={routerProps => (
                                <MetaAsync
                                    server={server}
                                    {...routerProps}
                                    setServer={setServer}
                                />
                            )}
                            path={`${match.url}/meta`}
                        />
                        <Route
                            render={routerProps => (
                                <ProcessesAsync
                                    server={server}
                                    {...routerProps}
                                    setServer={setServer}
                                />
                            )}
                            path={`${match.url}/processes`}
                        />
                        <Route
                            render={routerProps => (
                                <DatabasesAsync
                                    server={server}
                                    {...routerProps}
                                    setServer={setServer}
                                />
                            )}
                            path={`${match.url}/databases`}
                        />
                        <Route
                            render={({ location, match, ...rest }) => (
                                <SingleSiteAsync
                                    {...rest}
                                    match={match}
                                    server={server}
                                    location={location}
                                    setServer={setServer}
                                    site={site || getCurrentSite({ location, match, server })}
                                />
                            )}
                            path={`${match.url}/sites/:site`}
                        />
                    </Container>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default ServerDetails
