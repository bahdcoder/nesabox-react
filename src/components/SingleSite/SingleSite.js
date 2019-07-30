import React from 'react'
import GhostApp from 'pages/GhostApp'
import Loader from 'components/Loader'
import Section from 'components/Section'
import { SegmentedControl, Button } from 'evergreen-ui'

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
            {site && site.app_type === 'None' && (
                <Section
                    title="Application type"
                    description="App could be a ghost blog, or a git repository"
                >
                    {!site.installing_ghost && (
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
                </Section>
            )}
            {site && site.app_type === 'ghost' && <GhostApp {...rest} site={site} />}
        </React.Fragment>
    )
}

export default SingleSite
