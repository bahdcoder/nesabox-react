import React from 'react'
import Ace from 'react-ace'
import { css } from 'glamor'
import Section from 'components/Section'
import { Button, Dialog, Text, withTheme } from 'evergreen-ui'

import 'brace/mode/sh'
import 'brace/theme/tomorrow'

const GhostApp = ({
    uninstalling,
    setUninstalling,
    uninstallGhost,
    site,
    theme,
    submitting
}) => {
    const editorStyles = css({
        padding: 16,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `1px solid ${theme.palette.neutral.light}`
    })

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

                        <div id="deployment-logs" className={editorStyles}>
                            <Ace
                                readOnly
                                mode="sh"
                                width="100%"
                                theme="tomorrow"
                                showGutter={false}
                                value={site.logs || ''}
                                name="deployment-logs"
                                showPrintMargin={false}
                                editorProps={{
                                    showGutter: false,
                                    showLineNumbers: false,
                                    maxLines: Infinity
                                }}
                            />
                        </div>
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
