import { css } from 'glamor'
import client from 'utils/axios'
import Logs from 'components/Logs'
import Container from 'components/Container'
import { withSocket, withAuth } from 'utils/hoc'
import React, { useState, useEffect, useReducer } from 'react'
import {
    withTheme,
    Button,
    Text,
    SideSheet,
    Pane,
    IconButton
} from 'evergreen-ui'

const notificationsReducer = (notifications, action) => {
    switch (action.type) {
        case 'ALERT_RECEIVED':
            return [action.payload, ...notifications]
        case 'ALERTS_FETCHED':
            return action.payload
        default:
            return notifications
    }
}

const Notifications = ({ theme, auth, echo }) => {
    const [user] = auth
    const [showOutput, setShowOutput] = useState({})
    const [notifications, setNotifications] = useReducer(
        notificationsReducer,
        []
    )

    const pushNewNotification = notification =>
        setNotifications({
            type: 'ALERT_RECEIVED',
            payload: notification
        })

    const fetchNotifications = () =>
        client.get('/notifications').then(({ data }) => {
            setNotifications({
                type: 'ALERTS_FETCHED',
                payload: data
            })
        })

    useEffect(() => {
        fetchNotifications()
    }, [user])

    useEffect(() => {
        const [socket] = echo

        const channel = socket
            .private(`App.User.${user.id}`)
            .notification(notification => {
                if (
                    notification.type === 'App\\Notifications\\Servers\\Alert'
                ) {
                    pushNewNotification(notification)
                }
            })

        return () => channel.unsubscribe()
        // eslint-disable-next-line
    }, [])

    const hideAlert = notification => {
        setNotifications({
            type: 'ALERTS_FETCHED',
            payload: notifications.filter(n => n.id !== notification.id)
        })

        client.post(`/notifications/${notification.id}`)
    }

    const colorMatches = {
        error: 'red',
        'info-delete': 'blue',
        'deployment-failed': 'red'
    }

    return notifications.map((notification, index) => (
        <div
            key={notification.id}
            className={css(
                {
                    width: '100%',
                    height: '50px',
                    background:
                        theme.palette[
                            colorMatches[
                                notification.data && notification.data.type
                            ] || 'error'
                        ].light
                },
                index !== notifications.length - 1 && {
                    borderBottom: `1px solid ${theme.palette[colorMatches[notification.data && notification.data.type] || 'info-delete'].base}`
                }
            )}
        >
            <Container
                className={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text>{notification.data && notification.data.message}</Text>

                <div
                    className={css({
                        display: 'flex'
                    })}
                >
                    {notification.data && notification.data.output && (
                        <Button
                            onClick={() =>
                                setShowOutput({
                                    [notification.id]: true
                                })
                            }
                        >
                            View output
                        </Button>
                    )}

                    <IconButton
                        onClick={() => hideAlert(notification)}
                        marginLeft={8}
                        icon="cross"
                    />
                </div>

                <SideSheet
                    isShown={showOutput[notification.id]}
                    onCloseComplete={() =>
                        setShowOutput({
                            ...showOutput,
                            [notification.id]: false
                        })
                    }
                >
                    <Pane width={'100%'} padding={40}>
                        {notification.data && notification.data.output && (
                            <React.Fragment>
                                <Logs logs={notification.data.output} />

                                <div
                                    {...css({
                                        marginTop: 16
                                    })}
                                >
                                    <Text>
                                        Your deployment failed for the reason
                                        above. If the error is not coming from
                                        your deploy script, Then this sometimes
                                        has to do with an inconsistency with
                                        your git tree, sometimes caused by a
                                        forced-update. If that is the case, you
                                        need to ssh into your server and update
                                        the git tree manually.
                                    </Text>
                                </div>
                            </React.Fragment>
                        )}
                        <Button
                            marginTop={16}
                            appearance="primary"
                            intent="success"
                            onClick={() =>
                                setShowOutput({
                                    ...showOutput,
                                    [notification.id]: false
                                })
                            }
                        >
                            Close
                        </Button>
                    </Pane>
                </SideSheet>
            </Container>
        </div>
    ))
}

export default withAuth(withSocket(withTheme(Notifications)))
