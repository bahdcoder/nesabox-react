import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer, WebsocketConsumer } from './context'

export const withAuth = WrappedComponent => {
    const WithWrappedComponent = props => (
        <AuthConsumer>
            {value => <WrappedComponent auth={value} {...props} />}
        </AuthConsumer>
    )

    WithWrappedComponent.displayName = `withAuth(${WrappedComponent.name})`

    return WithWrappedComponent
}

export const withSocket = WrappedComponent => {
    const WithWrappedComponent = props => (
        <WebsocketConsumer>
            {value => <WrappedComponent echo={value} {...props} />}
        </WebsocketConsumer>
    )

    WithWrappedComponent.displayName = `withSocket(${WrappedComponent.name})`

    return WithWrappedComponent
}

const MustBeUnAuthenticatedRoute = ({ page: Page, auth, ...rest }) => {
    const [user] = auth

    return (
        <Route
            {...rest}
            render={props =>
                !user ? (
                    <Page {...props} auth={auth} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

const ProtectedRoute = ({ page: Page, auth, ...rest }) => {
    const [user] = auth

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Page {...props} auth={auth} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/authenticate',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export const AuthRoute = withAuth(ProtectedRoute)
export const NoAuthRoute = withAuth(MustBeUnAuthenticatedRoute)
