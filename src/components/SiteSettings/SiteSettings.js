import React from 'react'
import Logs from 'components/Logs'
import Section from 'components/Section'
import UpdateFile from 'components/UpdateFile'
import Env from 'components/EnvironmentVariables'
import { Button, Dialog, Small, Pane } from 'evergreen-ui'

import 'brace/mode/sh'
import 'brace/mode/json'
import 'brace/theme/tomorrow'
import 'brace/mode/javascript'

const SiteSettings = ({
    site,
    server,
    working,
    pm2File,
    configFile,
    setPm2File,
    updatePm2File,
    fetchPm2File,
    workingOnPm2,
    setConfigFile,
    nginxConfig,
    deleteSite,
    deletingSite,
    setDeletingSite,
    deletingSiteApi,
    workingNginx,
    setNginxConfig,
    fetchNginxConfig,
    updateNginxConfig,
    nginxReloadOutput,
    setNginxReloadOutput,
    setConfigurationFile,
    getConfigurationFile
}) => {
    return (
        <React.Fragment>
            {site.app_type === 'ghost' && (
                <UpdateFile
                    aceMode={'json'}
                    file={configFile}
                    working={working}
                    setFile={setConfigFile}
                    fetchFile={getConfigurationFile}
                    updateFile={setConfigurationFile}
                    fileName="config.production.json"
                    description="Here you can edit / update your ghost configuration file directly and securely over SSH."
                />
            )}

            <UpdateFile
                file={pm2File}
                setFile={setPm2File}
                aceMode={'javascript'}
                working={workingOnPm2}
                fetchFile={fetchPm2File}
                updateFile={updatePm2File}
                fileName={`pm2 ecosystem file`}
                description="Here you can edit / update your pm2 ecosystem configuration file directly and securely over SSH."
            />

            <UpdateFile
                aceMode={'sh'}
                file={nginxConfig}
                working={workingNginx}
                setFile={setNginxConfig}
                fetchFile={fetchNginxConfig}
                updateFile={updateNginxConfig}
                fileName={`Nginx configuration file`}
                description="Update the nginx configuration specifically for this site."
            />
            <Dialog
                hasFooter={false}
                isShown={!!nginxReloadOutput}
                title="Nginx configuration test output"
            >
                <Logs logs={nginxReloadOutput} />

                <Pane borderTop="muted" clearfix>
                    <Pane padding={16} float="right">
                        <Button
                            tabIndex={0}
                            onClick={() => setNginxReloadOutput(null)}
                        >
                            Close
                        </Button>
                    </Pane>
                </Pane>
            </Dialog>

            {['git'].includes(site.app_type) && (
                <Env site={site} server={server} />
            )}

            <Section
                title="Delete this site"
                description="Delete this site, with all pm2 processes, all nginx configurations, site folder and generated SSL certificates."
            >
                <Dialog
                    intent="danger"
                    title="Delete dialog"
                    isShown={deletingSite}
                    onConfirm={deleteSite}
                    onCloseComplete={() => setDeletingSite(false)}
                    confirmLabel={'Delete Site'}
                >
                    <Small display="flex" width="100%" justifyContent="center">
                        Are you sure you want to delete this site ?
                    </Small>
                </Dialog>
                <Button
                    isLoading={deletingSiteApi}
                    onClick={() => setDeletingSite(true)}
                    intent="danger"
                    appearance="primary"
                >
                    Delete Site
                </Button>
            </Section>
        </React.Fragment>
    )
}

export default SiteSettings
