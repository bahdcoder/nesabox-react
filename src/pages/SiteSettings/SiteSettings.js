import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import SiteSettingsDetails from 'components/SiteSettings'

const SiteSettings = props => {
    const [pm2File, setPm2File] = useState(null)
    const [configFile, setConfigFile] = useState(null)
    const [working, setWorking] = useState(false)
    const [nginxReloadOutput, setNginxReloadOutput] = useState(null)
    const [deletingSiteApi, setDeletingSiteApi] = useState(false)
    const [deletingSite, setDeletingSite] = useState(false)
    const [workingNginx, setWorkingNginx] = useState(false)
    const [nginxConfig, setNginxConfig] = useState(null)
    const [workingOnPm2, setWorkingOnPm2] = useState(false)

    const updatePm2File = () => {
        setWorkingOnPm2(true)

        client
            .post(
                `/servers/${props.server.id}/sites/${props.site.id}/ecosystem-file`,
                {
                    ecosystemFile: pm2File
                }
            )
            .then(() => {
                setPm2File(null)

                toaster.success('Ecosystem file updated.')
            })
            .catch(({ response }) => {
                toaster.danger(
                    (response && response.data && response.data.message) ||
                        'Failed updating pm2 ecosystem file. Please check the process logs.'
                )
            })
            .finally(() => {
                setWorkingOnPm2(false)
            })
    }

    const fetchPm2File = () => {
        setWorkingOnPm2(true)

        client
            .get(
                `/servers/${props.server.id}/sites/${props.site.id}/ecosystem-file`
            )
            .then(({ data }) => {
                setPm2File(data)
            })
            .catch(({ response }) => {
                toaster.danger(
                    (response.data && response.data.message) ||
                        'Failed fetching pm2 ecosystem file.'
                )
            })
            .finally(() => {
                setWorkingOnPm2(false)
            })
    }

    const { history, server, site, setServer } = props

    const setConfigurationFile = () => {
        setWorking(true)

        client
            .post(`/servers/${server.id}/sites/${site.id}/ghost-config`, {
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
            .get(`/servers/${server.id}/sites/${site.id}/ghost-config`)
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

    const fetchNginxConfig = () => {
        setWorkingNginx(true)

        client
            .get(`/servers/${server.id}/sites/${site.id}/nginx-config`)
            .then(({ data }) => {
                setNginxConfig(data)
            })
            .catch(({ response }) => {
                toaster.danger(
                    (response.data && response.data.message) ||
                        'Failed fetching nginx configuration file.'
                )
            })
            .finally(() => {
                setWorkingNginx(false)
            })
    }

    const updateNginxConfig = () => {
        setWorkingNginx(true)

        client
            .post(`/servers/${server.id}/sites/${site.id}/nginx-config`, {
                nginxConfig
            })
            .then(({ data }) => {
                setNginxConfig(null)
                setNginxReloadOutput(data)

                toaster.success(
                    'Configuration file updated and nginx reloaded.'
                )
            })
            .catch(({ response }) => {
                toaster.danger('Nginx configuration was updated with errors.')

                setNginxReloadOutput(response.data.message)
            })
            .finally(() => {
                setWorkingNginx(false)
            })
    }

    const deleteSite = () => {
        setDeletingSiteApi(true)
        setDeletingSite(false)

        client
            .delete(`/servers/${server.id}/sites/${site.id}`)
            .then(({ data }) => {
                history.push(`/servers/${server.id}`)

                toaster.success('Site has been queued for deletion.')

                setServer(data)
            })
            .catch(({ response }) => {
                toaster.danger(
                    (response && response.data && response.data.message) ||
                        'Failed deleting site. This site might be performing actions.'
                )
            })
            .finally(() => {
                setDeletingSiteApi(false)
            })
    }

    return (
        <SiteSettingsDetails
            {...props}
            pm2File={pm2File}
            working={working}
            setPm2File={setPm2File}
            setWorking={setWorking}
            configFile={configFile}
            workingOnPm2={workingOnPm2}
            fetchPm2File={fetchPm2File}
            setConfigFile={setConfigFile}
            updatePm2File={updatePm2File}
            setWorkingOnPm2={setWorkingOnPm2}
            nginxConfig={nginxConfig}
            deletingSite={deletingSite}
            deleteSite={deleteSite}
            setDeletingSite={setDeletingSite}
            deletingSiteApi={deletingSiteApi}
            workingNginx={workingNginx}
            setNginxConfig={setNginxConfig}
            fetchNginxConfig={fetchNginxConfig}
            updateNginxConfig={updateNginxConfig}
            nginxReloadOutput={nginxReloadOutput}
            setNginxReloadOutput={setNginxReloadOutput}
            getConfigurationFile={getConfigurationFile}
            setConfigurationFile={setConfigurationFile}
        />
    )
}

export default SiteSettings
