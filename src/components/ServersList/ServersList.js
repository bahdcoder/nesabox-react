import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import Loader from 'components/Loader'
import EmptySet from 'components/EmptySet'
import Container from 'components/Container'
import { Link as RouterLink } from 'react-router-dom'
import ServerStatusIcon from 'components/ServerStatusIcon'
import { withTheme, Text, Link } from 'evergreen-ui'

import styles from './ServersList.css'

const ServersList = ({ servers, setCreatingServer, theme }) => {
    return (
        <React.Fragment>
            {!servers && <Loader />}
            {servers && servers.length === 0 && (
                <Container className={{ marginTop: '40' }}>
                    <EmptySet
                        heading="No servers yet."
                        description="Once you provision a server, it'll show up here."
                        buttonLabel="Add server"
                        handleAction={() => setCreatingServer(true)}
                    />
                </Container>
            )}
            {servers &&
                servers.length > 0 &&
                servers.map(server => (
                    <Link
                        key={server.id}
                        textDecoration={'none'}
                        is={RouterLink}
                        to={`/servers/${server.id}`}
                    >
                        <div
                            className={css([
                                styles.server,
                                {
                                    ':hover': {
                                        backgroundColor:
                                            theme.scales.neutral.N1,
                                        cursor: 'pointer'
                                    }
                                }
                            ])}
                        >
                            <Container
                                className={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    className={css(styles.serverNameContainer)}
                                >
                                    <Svg
                                        width={24}
                                        height={24}
                                        icon={server.provider}
                                    />

                                    <Text marginLeft={16}>{server.name}</Text>
                                </div>

                                <div className={css(styles.serverStatus)}>
                                    <Text>{server.ip_address}</Text>
                                    <ServerStatusIcon status={server.status} />

                                    {/* <IconButton marginLeft='16' icon='full-circle' appearance='minimal' /> */}
                                </div>
                            </Container>
                        </div>
                    </Link>
                ))}
        </React.Fragment>
    )
}

export default withTheme(ServersList)
