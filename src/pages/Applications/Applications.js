import React from 'react'
import Helmet from 'react-helmet'
import SourceControl from 'pages/SourceControl'

const Applications = ({ location, match, history }) => {
    return (
        <React.Fragment>
            <Helmet>Applications</Helmet>

            <SourceControl
                location={location}
                match={match}
                history={history}
            />
        </React.Fragment>
    )
}

export default Applications
