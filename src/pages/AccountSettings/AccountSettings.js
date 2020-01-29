import React from 'react'
import Loadable from 'react-loadable'
import Loading from 'components/Loader'
import { Route } from 'react-router-dom'

// components
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import Container from 'components/Container'

import Account from 'pages/Account'
import Applications from 'pages/Applications'
import Subscriptions from 'pages/Subscriptions'

const AsyncTeams = Loadable({
    loader: () =>
        import(/* webpackChunkName: "AccountSettings-Teams" */ 'pages/Teams'),
    loading: Loading
})

const AccountSettings = ({ match, location }) => {
    return (
        <React.Fragment>
            <PageTitle title="Manage Account" />
            <SubNavbar
                items={[
                    {
                        label: 'Account',
                        active: location.pathname === '/account',
                        to: match.url
                    },
                    {
                        label: 'Applications',
                        active: location.pathname.search(/applications/) > 0,
                        to: `${match.url}/applications`
                    },
                    {
                        label: 'Teams',
                        active: location.pathname.search(/teams/) > 0,
                        to: `${match.url}/teams`
                    },
                    {
                        label: 'Subscriptions',
                        active: location.pathname.search(/subscriptions/) > 0,
                        to: `${match.url}/subscriptions`
                    }
                ]}
            />
            <Container>
                <Route exact path={`${match.url}`} component={Account} />
                <Route
                    exact
                    path={`${match.url}/teams`}
                    component={AsyncTeams}
                />
                <Route
                    exact
                    path={`${match.url}/subscriptions`}
                    component={Subscriptions}
                />
                <Route
                    exact
                    path={`${match.url}/applications`}
                    component={Applications}
                />

                <Route
                    exact
                    component={Applications}
                    path={`${match.url}/applications/:provider`}
                />
            </Container>
        </React.Fragment>
    )
}

export default AccountSettings
