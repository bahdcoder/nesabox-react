import React from 'react'
import Cron from 'pages/Cron'
import Daemon from 'pages/Daemon'

const Processes = props => {
    if (props.server.type === 'load_balancer') return null

    return (
        <React.Fragment>
            <Daemon {...props} />
            <Cron {...props} />
        </React.Fragment>
    )
}

export default Processes
