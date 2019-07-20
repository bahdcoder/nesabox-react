import React from 'react'
import Loadable from 'react-loadable'
import Loading from 'components/Loader'
import { Route } from 'react-router-dom'

// components
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import Container from 'components/Container'

const AsyncAccount = Loadable({
    loader: () => import(/* webpackChunkName: "AccountSettings-Account" */ 'pages/Account'),
    loading: Loading
})

const AsyncApplications = Loadable({
    loader: () => import(/* webpackChunkName: "AccountSettings-Applications" */ 'pages/Applications'),
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
                    }
                ]}
            />
            <Container>
                <Route exact path={`${match.url}`} component={AsyncAccount} />
                <Route
                    exact
                    path={`${match.url}/applications`}
                    component={AsyncApplications}
                />

                <Route
                    exact
                    component={AsyncApplications}
                    path={`${match.url}/applications/:provider`}
                />
            </Container>
        </React.Fragment>
    )
}

export default AccountSettings
