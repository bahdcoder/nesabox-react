import React from 'react'
import { Route } from 'react-router-dom'
// pages
import Account from 'pages/Account'
import Applications from 'pages/Applications'

// components
import PageTitle from 'components/PageTitle'
import SubNavbar from 'components/SubNavbar'
import Container from 'components/Container'

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
                        active: location.pathname === '/account/applications',
                        to: `${match.url}/applications`
                    }
                ]}
            />
            <Container>
                <Route exact path={`${match.url}`} component={Account} />
                <Route
                    exact
                    path={`${match.url}/applications`}
                    component={Applications}
                />
            </Container>
        </React.Fragment>
    )
}

export default AccountSettings
