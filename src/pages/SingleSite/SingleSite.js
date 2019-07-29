import client from 'utils/axios'
import Loadable from 'react-loadable'
import Loader from 'components/Loader'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'

const SingleSiteAsync = Loadable({
    loader: () => import(/* webpackChunkName: "Server-SingleSite-Apps" */ 'components/SingleSite'),
    loading: Loader
})

const SiteSettingsAsync = Loadable({
    loader: () => import(/* webpackChunkName: "Server-SingleSite-Settings" */ 'pages/SiteSettings'),
    loading: Loader
})

const SingleSite = props => {
    const [appType, setAppType] = useState('ghost')
    const [submitting, setSubmitting] = useState(false)

    const installGhost = () => {
        setSubmitting(true)
    }

    return (
        <React.Fragment>
            <Route
                exact
                render={routerProps => (
                    <SingleSiteAsync
                        {...props}
                        {...routerProps}
                        appType={appType}
                        setAppType={setAppType}
                        submitting={submitting}
                        installGhost={installGhost}
                        setSubmitting={setSubmitting}
                    />
                )}
                path={props.match.url}
            />

            <Route
                render={routerProps => (
                    <SiteSettingsAsync
                        {...props}
                        {...routerProps}
                    />
                )}
                path={`${props.match.url}/settings`}
            />
        </React.Fragment>
    )
}

export default SingleSite
