import React, { useEffect } from 'react'
import { withSocket, withAuth } from 'utils/hoc'

const UserChannel = ({ children, echo, auth }) => {
    useEffect(() => {
        const [socket] = echo
        socket && socket.private('App.User.1').notification((notification) => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', notification);
        })
    }, [echo, auth])

    return <React.Fragment>{children}</React.Fragment>
}

export default withAuth(withSocket(UserChannel))
