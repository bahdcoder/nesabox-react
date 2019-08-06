import React from 'react'
import GitApp from 'pages/GitApp'
import GhostApp from 'pages/GhostApp'
import Loader from 'components/Loader'
import Section from 'components/Section'
import { SegmentedControl, Button } from 'evergreen-ui'
import SelectRepoForGitApp from 'components/SelectRepoForGitApp'

const SingleSite = ({
    site,
    setAppType,
    appType,
    submitting,
    installGhost,
    ...rest
}) => {
    return (
        <React.Fragment>
            {!site && <Loader />}

            {site.app_type === 'None' && (
                <Section
                    title="Application type"
                    description="App could be a ghost blog, or a git repository"
                >
                    {!site.installing_ghost && !site.installing_repository && appType !== 'git' && (
                        <SegmentedControl
                            width={'100%'}
                            options={[
                                {
                                    label: 'Ghost blog',
                                    value: 'ghost'
                                },
                                {
                                    label: 'Node BB Forum',
                                    value: 'nodebb'
                                },
                                {
                                    label: 'Git Repository',
                                    value: 'git'
                                }
                            ]}
                            value={appType}
                            onChange={value => setAppType(value)}
                        />
                    )}

                    {appType === 'ghost' && (
                        <Button
                            marginTop={16}
                            intent="success"
                            appearance="primary"
                            onClick={installGhost}
                            isLoading={submitting || site.installing_ghost}
                        >
                            Install Ghost Blog
                        </Button>
                    )}

                    {appType === 'git' && <SelectRepoForGitApp {...rest} site={site} />}
                </Section>
            )}
            {site && site.app_type === 'ghost' && (
                <GhostApp {...rest} site={site} />
            )}
            {site && site.app_type === 'git' && (
                <GitApp {...rest} site={site} />
            )}
        </React.Fragment>
    )
}

export default SingleSite
