import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import ServerSettingsForms from 'components/ServerSettings'

const ServerSettings = props => {
    const { history } = props
    const [deletingServer, setDeletingServer] = useState(false)

    const deleteServer = () => {
        setDeletingServer(true)

        client
            .delete(`/servers/${props.server.id}`)
            .then(() => {
                toaster.success('Server deleted.')

                history.push('/')
            })
            .catch(() => {
                toaster.danger('Failed to delete server.')
            })
            .finally(() => {
                setDeletingServer(false)
            })
    }

    return (
        <ServerSettingsForms
            {...props}
            deleteServer={deleteServer}
            deletingServer={deletingServer}
        />
    )
}

export default ServerSettings
