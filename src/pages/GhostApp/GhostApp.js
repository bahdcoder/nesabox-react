import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import GhostAppDetails from 'components/GhostApp'

const GhostApp = props => {
    const [submitting, setSubmitting] = useState(false)
    const [uninstalling, setUninstalling] = useState(false)

    const uninstallGhost = (closeConfirmDialog) => {
        closeConfirmDialog()

        setSubmitting(true)

        client.post(`/servers/${props.server.id}/sites/${props.site.id}/uninstall-ghost`)
            .then(({ data }) => {
                props.setServer(data)

                toaster.success('Uninstalling ghost now.')
            })
            .finally(() => {
                setSubmitting(false)

                toaster.danger('Failed uninstalling ghost. Please try again later.')
            })
    }

    return (
        <GhostAppDetails
            {...props}
            submitting={submitting}
            uninstalling={uninstalling}
            uninstallGhost={uninstallGhost}
            setUninstalling={setUninstalling}
        />
    )
}

export default GhostApp
