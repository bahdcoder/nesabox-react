import React from 'react'
import Loader from 'components/Loader'
import Section from 'components/Section'
import { SegmentedControl, Button } from 'evergreen-ui'

const SingleSite = ({ site, setAppType, appType, submitting, installGhost }) => {
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
        </React.Fragment>
    )
}

export default SingleSite
