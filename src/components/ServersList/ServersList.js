import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import Loader from 'components/Loader'
import EmptySet from 'components/EmptySet'
import Container from 'components/Container'
import { withTheme, Text, Icon } from 'evergreen-ui'

import styles from './ServersList.css'

const ServersList = ({ servers, setCreatingServer, theme }) => {
    const statusIcons = {
        active: {
            icon: 'tick-circle',
            color: 'success'
        },
        initializing: {
            icon: 'social-media',
            color: 'redTint'
        },
        new: {
            icon: 'social-media',
            color: 'redTint'
        }
    }

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
                    <div
                        key={server.id}
                        className={css([
                            styles.server,
                            {
                                ':hover': {
                                    backgroundColor: theme.scales.neutral.N1,
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
                            <div className={css(styles.serverNameContainer)}>
                                <span>
                                    <Svg
                                        width={24}
                                        height={24}
                                        icon={server.provider}
                                    />
                                </span>

                                <Text marginLeft={16}>{server.name}</Text>
                            </div>

                            <div className={css(styles.serverStatus)}>
                                <Text>{server.ip_address}</Text>
                                <span>
                                    {statusIcons[server.status] && (
                                        <Icon
                                            className={
                                                [
                                                    'initializing',
                                                    'new'
                                                ].includes(server.status) &&
                                                'rotate animated infinite'
                                            }
                                            size={16}
                                            marginRight={16}
                                            marginLeft={16}
                                            icon={
                                                statusIcons[server.status].icon
                                            }
                                            color={
                                                statusIcons[server.status].color
                                            }
                                            fill={
                                                [
                                                    'initializing',
                                                    'new'
                                                ].includes(server.status)
                                                    ? theme.scales.blue.B9
                                                    : undefined
                                            }
                                        />
                                    )}
                                </span>

                                {/* <IconButton marginLeft='16' icon='full-circle' appearance='minimal' /> */}
                            </div>
                        </Container>
                    </div>
                ))}
        </React.Fragment>
    )
}

export default withTheme(ServersList)
