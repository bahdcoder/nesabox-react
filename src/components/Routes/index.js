import React from 'react'
import Navbar from 'components/Navbar'
import Topbar from 'components/Topbar'
import { Route, withRouter } from 'react-router-dom'

// PAGES
import Login from 'pages/Login'

const Routes = ({ location }) => {

  return (
    <React.Fragment>
      <Topbar />
      {location.pathname === '/' && <Navbar />}
      <Route component={Login} path='/login' />
    </React.Fragment>
  )
} 

export default withRouter(Routes)
