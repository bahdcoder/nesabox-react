import React from 'react'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import Section from 'components/Section'
import { SegmentedControl, Button } from 'evergreen-ui'
import SelectRepoForGitApp from 'components/SelectRepoForGitApp'

const GhostAppAsync = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "Server-SingleSite-GhostApp" */ 'pages/GhostApp'
        ),
    loading: Loader
})

const GitAppAsync = Loadable({
    loader: () =>
        import(
            /* webpackChunkName: "Server-SingleSite-GitApp" */ 'pages/GitApp'
        ),
    loading: Loader
})

const SingleSite = ({
    site,
    setAppType,
    appType,
    setSite,
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
                    {!site.installing_ghost &&
                        !site.installing_repository &&
                        appType !== 'git' && (
                            <SegmentedControl
                                width={'100%'}
                                options={[
                                    {
                                        label: 'Ghost blog',
                                        value: 'ghost'
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

                    {appType === 'git' && (
                        <SelectRepoForGitApp
                            setSite={setSite}
                            setAppType={setAppType}
                            {...rest}
                            site={site}
                        />
                    )}
                </Section>
            )}

            {site && site.app_type === 'ghost' && (
                <GhostAppAsync {...rest} site={site} setSite={setSite} />
            )}
            {site && site.app_type === 'git' && (
                <GitAppAsync {...rest} site={site} setSite={setSite} />
            )}
        </React.Fragment>
    )
}

export default SingleSite
