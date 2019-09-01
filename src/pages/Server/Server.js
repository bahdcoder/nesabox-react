import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import ServerDetails from 'components/Server'
import { withSocket, withAuth } from 'utils/hoc'
import React, { useEffect, useReducer } from 'react'

const serverReducer = (server, action) => {
    switch (action.type) {
        case 'SERVER_FETCHED':
            return action.payload
        default:
            return server
    }
}

const Server = ({ match, history, location, echo, auth }) => {
    const [user] = auth
    const [server, setServer] = useReducer(serverReducer, null)

    useEffect(() => {
        client
            .get(`/servers/${match.params.server}`)
            .then(({ data }) => {
                setServer({
                    type: 'SERVER_FETCHED',
                    payload: data
                })
            })
            .catch(() => {
                toaster.danger('Server was not found.')

                history.push('/dashboard')
            })
        // eslint-disable-next-line
    }, [match.params.server])

    useEffect(() => {
        const [socket] = echo

        socket &&
            socket.private(`App.User.${user.id}`).notification(notification => {
                if (
                    notification.type ===
                    'App\\Notifications\\Servers\\ServerIsReady'
                ) {
                    setServer({
                        type: 'SERVER_FETCHED',
                        payload: notification.server
                    })
                }
            })

        // return () =>
        //     socket && socket.private(`App.User.${user.id}`).unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [echo, user])

    return (
        <ServerDetails
            match={match}
            server={server}
            location={location}
            setServer={payload =>
                setServer({ type: 'SERVER_FETCHED', payload })
            }
        />
    )
}

export default withSocket(withAuth(Server))
