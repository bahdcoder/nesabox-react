import React from 'react'
import { Button, Link } from 'evergreen-ui'
import Section from 'components/Section'
import { Link as RouterLink } from 'react-router-dom'

const Monitoring = ({ server, submitting, installMonitoring }) => {
    return (
        <Section
            title="Server monitoring"
            description="Server monitoring is setup automatically using Netdata. Once installed, you can monitor the performance of your server, databases, nginx, systemd services and so much more."
        >
            {!server.server_monitoring_installed && (
                <Button
                    isLoading={
                        server.server_monitoring_installing || submitting
                    }
                    appearance="primary"
                    intent="success"
                    onClick={installMonitoring}
                >
                    Install server monitoring
                </Button>
            )}
            {server.server_monitoring_installed && (
                <React.Fragment>
                    <Button
                        is={'a'}
                        target="_blank"
                        href={server.server_monitoring_site}
                    >
                        Monitor Server
                    </Button>
                </React.Fragment>
            )}
        </Section>
    )
}

export default Monitoring
