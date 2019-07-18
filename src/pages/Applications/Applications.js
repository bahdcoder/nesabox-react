import React from 'react'
import Helmet from 'react-helmet'
import SourceControl from 'pages/SourceControl'
import ServerProviders from 'pages/ServerProviders'

const Applications = ({ location, match, history }) => {
    return (
        <React.Fragment>
            <Helmet>Applications</Helmet>

            <SourceControl
                location={location}
                match={match}
                history={history}
            />

            <ServerProviders />
        </React.Fragment>
    )
}

export default Applications
