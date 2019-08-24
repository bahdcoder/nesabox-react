import React from 'react'
import Logs from 'components/Logs'
import Section from 'components/Section'
import { Button, Dialog, Text, withTheme } from 'evergreen-ui'

const GhostApp = ({
    uninstalling,
    setUninstalling,
    uninstallGhost,
    site,
    theme,
    submitting
}) => {
    return (
        <Section
            title="Ghost blog"
            description="You can manage your ghost installation here."
        >
            <div>
                {site.installing_ghost && (
                    <React.Fragment>
                        <Button
                            appearance="primary"
                            marginBottom={16}
                            isLoading={site.installing_ghost}
                        >
                            Installing Ghost
                        </Button>

                        {site.logs && <Logs logs={site.logs} />}
                    </React.Fragment>
                )}

                {site.is_app_ready && (
                    <React.Fragment>
                        <Button
                            intent="danger"
                            appearance="primary"
                            onClick={() => setUninstalling(true)}
                            isLoading={site.uninstalling_ghost || submitting}
                        >
                            Uninstall Ghost
                        </Button>

                        <Dialog
                            intent="danger"
                            isShown={uninstalling}
                            title="Uninstall Ghost"
                            onConfirm={uninstallGhost}
                            confirmLabel="Uninstall Ghost"
                            onCloseComplete={() => setUninstalling(false)}
                        >
                            <Text
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                Are you sure you want to uninstall ghost blog ?{' '}
                            </Text>
                        </Dialog>
                    </React.Fragment>
                )}
            </div>
        </Section>
    )
}

export default withTheme(GhostApp)
