import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import { withSocket, withAuth } from 'utils/hoc'
import React, { useState, useEffect } from 'react'
import DatabaseDetails from 'components/Databases'

const Databases = props => {
    const { server, match } = props
    const [loading, setLoading] = useState(true)
    const [databases, setDatabases] = useState([])
    const [databaseUsers, setDatabaseUsers] = useState([])
    const [[form, setValue], [submitting], [errors]] = useForm({
        name: '',
        user: 'nesa',
        password: '',
        database_user_id: ''
    })

    const { echo } = props

    const refreshDatabases = (callback = null) => {
        setLoading(true)
        return client
            .get(`/servers/${server.id}/databases/${match.params.database}`)
            .then(({ data }) => {
                setLoading(false)

                callback && callback(data)
                setDatabases(data.databases)
                setDatabaseUsers(data.database_users)
            })
            .catch(() => {
                toaster.danger('Failed fetching databases.')
            })
    }

    useEffect(() => {
        refreshDatabases()

        const [socket] = echo

        socket.notification(notification => {
            if (
                notification.type ===
                'App\\Notifications\\Servers\\DatabasesUpdated'
            ) {
                refreshDatabases()
            }
        })

        // eslint-disable-next-line
    }, [match.params.database, server.id])

    return (
        <DatabaseDetails
            {...props}
            form={form}
            errors={errors}
            loading={loading}
            setValue={setValue}
            databases={databases}
            submitting={submitting}
            databaseUsers={databaseUsers}
            refreshDatabases={refreshDatabases}
        />
    )
}

export default withAuth(withSocket(Databases))
