import React from 'react'
import Navbar from 'components/Navbar'
import Topbar from 'components/Topbar'
import { AuthRoute, NoAuthRoute } from 'utils/hoc'
import { withRouter } from 'react-router-dom'

// PAGES
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'

const Routes = ({ location }) => {
    return (
        <React.Fragment>
            <Topbar />
            {location.pathname === '/' && <Navbar />}
            <NoAuthRoute page={Login} path="/login" />
            <AuthRoute page={Dashboard} path='/dashboard' />
        </React.Fragment>
    )
}

export default withRouter(Routes)
