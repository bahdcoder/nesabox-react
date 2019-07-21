import React from 'react'
import { css } from 'glamor'
import Sshkeys from 'pages/Sshkeys'
import { Pane } from 'evergreen-ui'
import { Helmet } from 'react-helmet'
import Section from 'components/Section'

const MetaDetails = ({ server, setServer }) => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Nesabox | Meta | server-name</title>
            </Helmet>

            <Sshkeys
                type="server"
                server={server}
                setServer={setServer}
                keyEndpoint={`/servers/${server.id}/sshkeys`}
                description="By default, Password authentication is disabled by default on all Nesabox servers. Add an SSH key to get access."
            />

            <Section
                title="Server's public key"
                description="This is the root access public key on your server. It is added to services like Github and Bitbucket, and you can also added it to external services if needed."
            >
                <Pane
                    width={'100%'}
                    display="flex"
                    padding="1rem"
                    border="default"
                    borderRadius={3}
                    background="tint1"
                    alignItems="center"
                    wordWrap='break-word'
                    flexDirection="column"
                    justifyContent="center"
                >
                    <div {...css({
                        width: '100%',
                        fontSize: '12px'
                    })}>
                        <code>
                            {server.ssh_key}
                        </code>
                    </div>
                </Pane>
            </Section>

            <Section
                title="Nesabox's public key"
                description="This key grants Nesa access to your server as both root and nesa users."
            >
                <Pane
                    width={'100%'}
                    display="flex"
                    padding="1rem"
                    border="default"
                    borderRadius={3}
                    background="tint1"
                    alignItems="center"
                    wordWrap='break-word'
                    flexDirection="column"
                    justifyContent="center"
                >
                    <div {...css({
                        width: '100%',
                        fontSize: '12px'
                    })}>
                        <code>
                            {server.nesa_key}
                        </code>
                    </div>
                </Pane>
            </Section>
        </React.Fragment>
    )
}

export default MetaDetails
