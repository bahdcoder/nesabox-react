import Ace from 'react-ace'
import { css } from 'glamor'
import client from 'utils/axios'
import Logs from 'components/Logs'
import { useForm } from 'utils/hooks'
import Loader from 'components/Loader'
import React, { useState } from 'react'
import Section from 'components/Section'
import Container from 'components/Container'
import { Button, withTheme, TextInput, Small, toaster } from 'evergreen-ui'

import 'brace/mode/sh'
import 'brace/theme/tomorrow'

const GitApp = ({ site, theme, server, setSite }) => {
    const editorStyles = css({
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `2px solid ${theme.palette.neutral.light}`
    })

    let latestDeployment =
        site.deployments.data.length > 0 ? site.deployments.data[0] : ''

    const [[form, setValue]] = useForm({
        before_deploy_script: site.before_deploy_script || '',
        after_deploy_script: site.after_deploy_script || ''
    })

    const [showLatestLogs, setShowLatestLogs] = useState(site.deploying)

    const updateButtonStyles = css({
        width: '100%',
        display: 'flex',
        marginTop: 16,
        justifyContent: 'flex-end'
    })

    const copyToClipboard = () => {
        document.getElementById('deployment_trigger_url').select()
        document.execCommand('copy')
        toaster.success('Deployment trigger url has been copied to clipboard.')
    }

    const deployNow = () => {
        setShowLatestLogs(true)

        client
            .post(`servers/${server.id}/sites/${site.id}/deployments`)
            .then(({ data }) => {
                setSite(data)

                toaster.success('Deployment has been queued.')
            })
            .catch(() => {
                toaster.danger('Failed triggering deployment.')
            })
    }

    const togglePushToDeploy = () => {}

    const updateSite = () => {
        client
            .put(`servers/${server.id}/sites/${site.id}`, form)
            .then(() => {
                toaster.success('Updated.')
            })
            .catch(() => {
                toaster.danger('Failed updated site.')
            })
    }

    return (
        <React.Fragment>
            {site.installing_repository && (
                <React.Fragment>
                    <Container>
                        <Loader />
                        <Small
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            Installing repository
                        </Small>
                    </Container>
                </React.Fragment>
            )}
            {!site.installing_repository && (
                <React.Fragment>
                    <Section
                        title="Deployment"
                        description="You can manually trigger a site deployment from your site dashboard."
                    >
                        <div>
                            <div
                                {...css({
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: latestDeployment
                                        ? 'space-between'
                                        : 'flex-end',
                                    marginBottom: 16
                                })}
                            >
                                {latestDeployment && (
                                    <Button
                                        onClick={() =>
                                            setShowLatestLogs(!showLatestLogs)
                                        }
                                    >
                                        {showLatestLogs ? 'Hide' : 'View'}{' '}
                                        {site.deploying ? '' : 'latest'}{' '}
                                        deployment logs
                                    </Button>
                                )}
                                <Button
                                    onClick={deployNow}
                                    intent="success"
                                    isLoading={site.deploying}
                                    appearance="primary"
                                >
                                    Deploy Now
                                </Button>
                            </div>

                            {showLatestLogs && latestDeployment && (
                                <Logs logs={latestDeployment.properties.log} />
                            )}
                        </div>
                    </Section>

                    <Section
                        title="Push to deploy"
                        description={`With Push to Deploy enabled, Nesabox would automatically deploy your application once new code is pushed to the ${site.repository_branch} of the ${site.repository} repository. This can also be triggered by merging a pull request.`}
                    >
                        <div>
                            <div
                                {...css({
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'flex-end',
                                    marginBottom: 16
                                })}
                            >
                                <Button
                                    onClick={togglePushToDeploy}
                                    isLoading={site.deploying}
                                    intent="success"
                                    appearance={
                                        site.quick_deploy
                                            ? undefined
                                            : 'primary'
                                    }
                                >
                                    {site.quick_deploy ? 'Disable' : 'Enable'}{' '}
                                    Push to Deploy
                                </Button>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Before deploy script"
                        description="You can define a bash script that would be run before the application is actually restarted, or started with PM2."
                    >
                        <div>
                            <div className={editorStyles}>
                                <Ace
                                    width="100%"
                                    mode="sh"
                                    height={'140px'}
                                    theme="tomorrow"
                                    showGutter={false}
                                    intent="success"
                                    showPrintMargin={false}
                                    value={form.before_deploy_script}
                                    onChange={content =>
                                        setValue(
                                            'before_deploy_script',
                                            content
                                        )
                                    }
                                    name="before-deploy-script"
                                    editorProps={{
                                        showGutter: false,
                                        showLineNumbers: false
                                    }}
                                />
                            </div>

                            <div {...updateButtonStyles}>
                                <Button
                                    marginLeft="5%"
                                    intent="success"
                                    appearance="primary"
                                    onClick={updateSite}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Deployment trigger url"
                        description="Creating a slack bot to ease your deployments ? Or using a service like Circle CI and want to trigger deployments after all tests pass ? Make a GET or POST request to this endpoint to trigger a deployment."
                    >
                        <div
                            className={css({
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            })}
                        >
                            <TextInput
                                readOnly
                                width="90%"
                                resize="none"
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
                            resize="none"
                            onChange={console.log}
                            id="deployment_trigger_url"
                            name="deployment_trigger_url"
                            value={site.repository_branch}
                        />

                        <Button
                            marginLeft="5%"
                            intent="success"
                            appearance="primary"
                            onClick={console.log}
                        >
                            Update
                        </Button>
                    </Section>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default withTheme(GitApp)
