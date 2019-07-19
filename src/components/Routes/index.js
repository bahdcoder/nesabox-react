import React from 'react'
import { withAuth } from 'utils/hoc'
import Navbar from 'components/Navbar'
import AppNavbar from 'components/AppNavbar'
import { withRouter } from 'react-router-dom'
import { AuthRoute, NoAuthRoute } from 'utils/hoc'
import { WebsocketProviderWrapper } from 'utils/context'

// PAGES
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import UserChannel from 'pages/UserChannel'
import AccountSettings from 'pages/AccountSettings'

const Routes = ({ location, auth: [user] }) => {
    return (
        <WebsocketProviderWrapper auth={user}>
            <UserChannel>
                <React.Fragment>
                    {!['/', '/login'].includes(location.pathname) && (
                        <AppNavbar />
                    )}
                    {location.pathname === '/' && <Navbar />}
                    <NoAuthRoute page={Login} path="/login" />
                    <AuthRoute page={Dashboard} path="/dashboard" />
                    <AuthRoute page={AccountSettings} path="/account" />
                </React.Fragment>
            </UserChannel>
        </WebsocketProviderWrapper>
    )
}

export default withAuth(withRouter(Routes))
