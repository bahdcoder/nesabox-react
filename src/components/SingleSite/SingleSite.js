import React from 'react'
import { Button } from 'evergreen-ui'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import Section from 'components/Section'
import SegmentedControl from 'components/SegmentedControl'
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

// {
//     icon: 'lock',
//     name: 'lets_encrypt',
//     title: 'Lets Encrypt',
//     description: 'Free SSL certificate'
// }
const SingleSite = ({
    site,
    setAppType,
    appType,
    setSite,
    submitting,
    installGhost,
    ...rest
}) => {
    const options = [
        rest.server.databases.includes('mysql') && {
            description: 'One click ghost install',
            icon: 'ghost',
            name: 'ghost',
            title: 'Ghost CMS'
        },
        {
            title: 'Git Repository',
            icon: 'github',
            name: 'git',
            description: 'Deploy from source control'
        }
    ].filter(Boolean)

    if (rest.server.type === 'load_balancer') return null

    return (
        <React.Fragment>
            {!site && <Loader />}

            {site.app_type === 'None' && (
                <Section
                    title="Application type"
                    description="App could be a ghost blog, or a git repository"
                >
                    {!site.installing_ghost && !site.installing_repository && (
                        <SegmentedControl
                            width={'100%'}
                            options={options}
                            handleClick={option => setAppType(option.name)}
                            selected={options.find(o => o.name === appType)}
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
