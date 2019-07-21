import React from 'react'
import { css } from 'glamor'
import { Small } from 'evergreen-ui'
import { Helmet } from 'react-helmet'
import Loader from 'components/Loader'
import Heading from 'components/Heading'
import PageTitle from 'components/PageTitle'
import ServerStatusIcon from 'components/ServerStatusIcon'

const Server = ({ server }) => {
    return (
        <PageTitle>
            {!server && <Loader />}
            {server && (
                <Helmet>
                    <title>Nesabox | {server.name}</title>
                </Helmet>
            )}
            {server && (
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    })}
                >
                    <Heading>Server Details</Heading>

                    <div className={css({
                        display: 'flex'
                    })}>
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
                            {server.status} <ServerStatusIcon status={server.status} />
                        </Small>
                    </div>
                </div>
            )}
        </PageTitle>
    )
}

export default Server
