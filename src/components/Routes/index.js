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
import ServerDetails from 'pages/Server'
import AccountSettings from 'pages/AccountSettings'

const Routes = ({ location, auth: [user] }) => {
    return (
        <WebsocketProviderWrapper auth={user}>
            <React.Fragment>
                {!['/', '/login'].includes(location.pathname) && <AppNavbar />}
                {location.pathname === '/' && <Navbar />}
                <NoAuthRoute page={Login} path="/login" />
                <AuthRoute page={Dashboard} path="/dashboard" />
                <AuthRoute page={AccountSettings} path="/account" />
                <AuthRoute page={ServerDetails} path="/servers/:server" />
            </React.Fragment>
        </WebsocketProviderWrapper>
    )
}

export default withAuth(withRouter(Routes))
