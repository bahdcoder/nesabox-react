import React from 'react'
import { withAuth } from 'utils/hoc'
import Loadable from 'react-loadable'
import Loading from 'components/Loader'
import Navbar from 'components/Navbar'
import AppNavbar from 'components/AppNavbar'
import { withRouter } from 'react-router-dom'
import { AuthRoute, NoAuthRoute } from 'utils/hoc'
import { WebsocketProviderWrapper } from 'utils/context'

const AsyncLogin = Loadable({
    loader: () => import(/* webpackChunkName: "Login" */ 'pages/Login'),
    loading: Loading
})

const AsyncDashboard = Loadable({
    loader: () => import(/* webpackChunkName: "Dashboard" */ 'pages/Dashboard'),
    loading: Loading
})

const AsyncServerDetails = Loadable({
    loader: () => import(/* webpackChunkName: "Server" */ 'pages/Server'),
    loading: Loading
})

const AsyncAccountSettings = Loadable({
    loader: () => import(/* webpackChunkName: "AccountSettings" */ 'pages/AccountSettings'),
    loading: Loading
})

const Routes = ({ location, auth: [user] }) => {
    return (
        <WebsocketProviderWrapper auth={user}>
            <React.Fragment>
                {!['/', '/login'].includes(location.pathname) && <AppNavbar />}
                {location.pathname === '/' && <Navbar />}
                <NoAuthRoute page={AsyncLogin} path="/login" />
                <AuthRoute page={AsyncDashboard} path="/dashboard" />
                <AuthRoute page={AsyncAccountSettings} path="/account" />
                <AuthRoute page={AsyncServerDetails} path="/servers/:server" />
            </React.Fragment>
        </WebsocketProviderWrapper>
    )
}

export default withAuth(withRouter(Routes))
