import React from 'react'
import Section from 'components/Section'
import { Button, Dialog, Text } from 'evergreen-ui'

const GhostApp = ({
    uninstalling,
    setUninstalling,
    uninstallGhost,
    site,
    submitting
}) => {
    return (
        <Section
            title="Ghost blog"
            description="You can manage your ghost installation here."
        >
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
        </Section>
    )
}

export default GhostApp
