import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import Loadable from 'react-loadable'
import { toaster } from 'evergreen-ui'
import Loading from 'components/Loader'
import AppNavbar from 'components/AppNavbar'
import { AuthRoute, NoAuthRoute } from 'utils/hoc'
import Notifications from 'components/Notifications'
import { WebsocketProviderWrapper } from 'utils/context'
import { withRouter, Redirect, Route, Switch } from 'react-router-dom'

const AsyncLogin = Loadable({
    loader: () => import(/* webpackChunkName: "Login" */ 'pages/Login'),
    loading: Loading
})

const AsyncForgotPassword = Loadable({
    loader: () =>
        import(/* webpackChunkName: "ForgotPassword" */ 'pages/ForgotPassword'),
    loading: Loading
})

const AsyncResetPassword = Loadable({
    loader: () =>
        import(/* webpackChunkName: "ResetPassword" */ 'pages/ResetPassword'),
    loading: Loading
})

const AsyncRegister = Loadable({
    loader: () => import(/* webpackChunkName: "Register" */ 'pages/Register'),
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
    loader: () =>
        import(
            /* webpackChunkName: "AccountSettings" */ 'pages/AccountSettings'
        ),
    loading: Loading
})

const Routes = ({ location, auth: [user] }) => {
    return (
        <WebsocketProviderWrapper auth={user}>
            {user && <AppNavbar />}
            {user && <Notifications />}
            <Switch>
                <AuthRoute exact page={AsyncDashboard} path="/" />
                <NoAuthRoute page={AsyncLogin} path="/auth/login" />
                <NoAuthRoute page={AsyncRegister} path="/auth/register" />
                <NoAuthRoute
                    page={AsyncForgotPassword}
                    path="/auth/forgot-password"
                />
                <NoAuthRoute
                    page={AsyncResetPassword}
                    path="/auth/reset-password/:token"
                />
                <AuthRoute page={AsyncAccountSettings} path="/account" />
                <AuthRoute page={AsyncServerDetails} path="/servers/:server" />
                <Route
                    render={() => {
                        toaster.danger('Page not found.')

                        return <Redirect to="/" />
                    }}
                />
            </Switch>
            <div
                className={css({
                    width: '100%',
                    height: '10px',
                    marginBottom: '200px'
                })}
            />
        </WebsocketProviderWrapper>
    )
}

export default withAuth(withRouter(Routes))
