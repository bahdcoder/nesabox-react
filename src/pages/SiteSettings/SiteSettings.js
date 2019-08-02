import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import SiteSettingsDetails from 'components/SiteSettings'

const SiteSettings = props => {
    const [configFile, setConfigFile] = useState(null)
    const [working, setWorking] = useState(false)

    const setConfigurationFile = () => {
        setWorking(true)

        client.post(`/servers/${props.server.id}/sites/${props.site.id}/ghost-config`, {
            configProductionJson: configFile
        })
        .then(() => {
            setConfigFile(null)

            toaster.success('Configuration file updated.')
        })
        .catch(({ response }) => {
            toaster.danger(
                (response && response.data && response.data.message) ||
                    'Failed updating ghost configuration file.'
            )
        })
        .finally(() => {
            setWorking(false)
        })
    }

    const getConfigurationFile = () => {
        setWorking(true)

        client
            .get(
                `/servers/${props.server.id}/sites/${props.site.id}/ghost-config`
            )
            .then(({ data }) => {
                setConfigFile(JSON.stringify(data, null, '\t'))
            })
            .catch(({ response }) => {
                toaster.danger(
                    (response.data && response.data.message) ||
                        'Failed fetching ghost configuration file.'
                )
            })
            .finally(() => {
                setWorking(false)
            })
    }

    return (
        <SiteSettingsDetails
            {...props}
            working={working}
            setWorking={setWorking}
            configFile={configFile}
            setConfigFile={setConfigFile}
            getConfigurationFile={getConfigurationFile}
            setConfigurationFile={setConfigurationFile}
        />
    )
}

export default SiteSettings
