import React from 'react'
import Ace from 'react-ace'
import { css } from 'glamor'
import Section from 'components/Section'
import { Button, withTheme, TextInput, Textarea, toaster } from 'evergreen-ui'

import 'brace/mode/batchfile'
import 'brace/theme/textmate'

const GitApp = ({ site, theme }) => {
    const editorStyles = css({
        padding: 16,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `1px solid ${theme.palette.neutral.light}`
    })

    const copyToClipboard = () => {
        document.getElementById('deployment_trigger_url').select()
        document.execCommand('copy')
        toaster.success('Deployment trigger url has been copied to clipboard.')
    }

    return (
        <React.Fragment>
            <Section
                title="Deployment"
                description="You can manually trigger a site deployment from your site dashboard."
            >
                <div
                    {...css({
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-end'
                    })}
                >
                    <Button appearance="primary">Deploy Now</Button>
                </div>
            </Section>

            <Section
                title="Before deploy script"
                description="You can define a bash script that would be run before the application is actually restarted, or started with PM2."
            >
                <div className={editorStyles}>
                    <Ace
                        width="100%"
                        height={'56px'}
                        mode="batchfile"
                        theme="textmate"
                        // value={configFile}
                        showGutter={false}
                        showPrintMargin={false}
                        // onChange={content => setConfigFile(content)}
                        name="before-deploy-script"
                        editorProps={{
                            showGutter: false,
                            showLineNumbers: false
                        }}
                    />
                </div>
            </Section>

            <Section
                title="After deploy script"
                description="You can define a bash script that would be run after all deployment steps are completed."
            >
                <div className={editorStyles}>
                    <Ace
                        width="100%"
                        height={'56px'}
                        mode="batchfile"
                        theme="textmate"
                        // value={configFile}
                        showGutter={false}
                        showPrintMargin={false}
                        // onChange={content => setConfigFile(content)}
                        name="after-deploy-script"
                        editorProps={{
                            showGutter: false,
                            showLineNumbers: false
                        }}
                    />
                </div>
            </Section>

            <Section
                title="Deployment trigger url"
                description="Creating a slack bot to ease your deployments ? Or using a service like Circle CI and want to trigger deployments after all tests pass ? Make a GET or POST request to this endpoint to trigger a deployment."
            >
                <div className={css({
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                })}>

                    <TextInput
                        readOnly
                        width="90%"
                        resize='none'
                        id="deployment_trigger_url"
                        name="deployment_trigger_url"
                        value={site.deployment_trigger_url}
                    />

                    <Button onClick={copyToClipboard}>Copy</Button>
                </div>
            </Section>

            <Section
                title="Deployment branch"
                description="Nesa pulls and deploys the code from this branch."
            >
                <TextInput
                    width="85%"
                    resize='none'
                    onChange={console.log}
                    id="deployment_trigger_url"
                    name="deployment_trigger_url"
                    value={site.repository_branch}
                />

                <Button marginLeft='5%' appearance='primary' onClick={console.log}>Update</Button>
            </Section>
        </React.Fragment>
    )
}

export default withTheme(GitApp)
