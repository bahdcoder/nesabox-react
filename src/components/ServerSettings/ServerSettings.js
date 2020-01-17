import { css } from 'glamor'
import React, { useState } from 'react'
import Section from 'components/Section'
import { Button, withTheme, Dialog, Text } from 'evergreen-ui'

const ServerSettings = ({ deleteServer, deletingServer, server, theme }) => {
    const [showDeleteServerConfirm, setShowDeleteServerConfirm] = useState(
        false
    )

    return (
        <Section
            title="Delete server"
            description="This will clear all data we have about this server. Databases, cron jobs, daemons, sites, everything. Nesabox will not touch the server itself."
        >
            <Button
                intent="danger"
                marginBottom={16}
                appearance="primary"
                onClick={() => setShowDeleteServerConfirm(true)}
            >
                Delete server
            </Button>

            {showDeleteServerConfirm && (
                <Dialog
                    isShown={true}
                    intent="danger"
                    title="Delete server"
                    onConfirm={deleteServer}
                    isConfirmLoading={deletingServer}
                    confirmLabel={'Permanently delete server'}
                    onCloseComplete={() => setShowDeleteServerConfirm(false)}
                >
                    <Text
                        width="100%"
                        minHeight={40}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        Are you sure you want to delete the server
                        <span
                            className={css({
                                padding: '0 5px',
                                color: theme.colors.intent.danger
                            })}
                        >
                            {server.name}
                        </span>
                    </Text>
                </Dialog>
            )}
        </Section>
    )
}

export default withTheme(ServerSettings)
