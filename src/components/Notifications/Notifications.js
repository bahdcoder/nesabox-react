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
            return [...notifications, action.payload]
        case 'ALERTS_FETCHED':
            return action.payload
        default:
            return notifications
    }
}

const Notifications = ({ theme, auth, echo }) => {
    const [user] = auth
    const [showOutput, setShowOutput] = useState(false)
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
        auth && fetchNotifications()
    }, [auth])

    useEffect(() => {
        const [socket] = echo

        user &&
            socket &&
            socket.private(`App.User.${user.id}`).notification(notification => {
                if (
                    notification.type === 'App\\Notifications\\Servers\\Alert'
                ) {
                    pushNewNotification(notification)
                }
            })
        // eslint-disable-next-line
    }, [echo, user])

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
    }

    return notifications.map((notification, index) => (
        <div
            key={notification.id}
            className={css(
                {
                    width: '100%',
                    height: '50px',
                    background: theme.palette[colorMatches[notification.data && notification.data.type] || 'info-delete'].light
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
                        <Button onClick={() => setShowOutput(true)}>
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
                    isShown={showOutput}
                    onCloseComplete={() => setShowOutput(false)}
                >
                    <Pane width={'100%'} padding={40}>
                        {notification.data && notification.data.output && (
                            <Logs
                                logs={notification.data && notification.data.output}
                            />
                        )}

                        <Button
                            marginTop={16}
                            appearance="primary"
                            intent="success"
                            onClick={() => setShowOutput(false)}
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
