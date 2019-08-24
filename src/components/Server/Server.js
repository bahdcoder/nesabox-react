import React from 'react'
import { css } from 'glamor'
import { Small } from 'evergreen-ui'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import Heading from 'components/Heading'
import { Route } from 'react-router-dom'
import Container from 'components/Container'
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import ServerStatusIcon from 'components/ServerStatusIcon'

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

const NetworkAsync = Loadable({
    loader: () =>
        import(/* webpackChunkName: "Server-Network" */ 'pages/Network'),
    loading: Loader
})

const ServerDetails = ({ server, location, match, setServer }) => {
    const isSitePath = location.pathname.search(/sites/) > 0

    return (
        <React.Fragment>
            {!server && <Loader />}
            {server && !isSitePath && (
                <PageTitle>
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
                </PageTitle>
            )}

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
                            label: 'Meta',
                            active: location.pathname.search(/meta/) > -1,
                            to: `${match.url}/meta`
                        },
                        {
                            label: 'Network',
                            active: location.pathname.search(/network/) > -1,
                            to: `${match.url}/network`
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

                    <Route
                        render={({ location, match, ...rest }) => (
                            <SingleSiteAsync
                                {...rest}
                                match={match}
                                server={server}
                                location={location}
                                setServer={setServer}
                            />
                        )}
                        path={`${match.url}/sites/:site`}
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
                            render={routerProps => (
                                <NetworkAsync
                                    server={server}
                                    {...routerProps}
                                    setServer={setServer}
                                />
                            )}
                            path={`${match.url}/network`}
                        />
                    </Container>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default ServerDetails
