import React from 'react'
import { AuthConsumer } from './context'
import { Route, Redirect } from 'react-router-dom'

export const withAuth = WrappedComponent => {
    const WithWrappedComponent = props => (
        <AuthConsumer>
            {value => <WrappedComponent auth={value} {...props} />}
        </AuthConsumer>
    )

    WithWrappedComponent.displayName = `withAuth(${WrappedComponent.name})`

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
                            pathname: '/dashboard',
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
                        to={{ pathname: '/', state: { from: props.location } }}
                    />
                )
            }
        />
    )
}

export const AuthRoute = withAuth(ProtectedRoute)
export const NoAuthRoute = withAuth(MustBeUnAuthenticatedRoute)
