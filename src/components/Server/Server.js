import React from 'react'
import { css } from 'glamor'
import { Small } from 'evergreen-ui'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import { Route } from 'react-router-dom'
import Heading from 'components/Heading'
import Container from 'components/Container'
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import ServerStatusIcon from 'components/ServerStatusIcon'

const MetaAsync = Loadable({
    loader: () => import(/* webpackChunkName: "Server-Meta" */ 'pages/Meta'),
    loading: Loader
})

const ServerDetails = ({ server, location, match, setServer }) => {
    return (
        <React.Fragment>
            <PageTitle>
                {!server && <Loader noPadding />}
                {server && (
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
                                    marginLeft: '24px',
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.region}
                            </Small>
                            <Small
                                className={css({
                                    marginLeft: '24px',
                                    textTransform: 'uppercase'
                                })}
                            >
                                {server.ip_address}
                            </Small>
                            <Small
                                className={css({
                                    display: 'flex',
                                    marginLeft: '24px',
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
            </PageTitle>

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
                        label: 'Daemons',
                        active: location.pathname.search(/daemons/) > -1,
                        to: `${match.url}/daemons`
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

            {server && (
                <Container>
                    <Route
                        render={routerProps => (
                            <MetaAsync {...routerProps} server={server} setServer={setServer} />
                        )}
                        path={`${match.url}/meta`}
                    />
                </Container>
            )}
        </React.Fragment>
    )
}

export default ServerDetails
