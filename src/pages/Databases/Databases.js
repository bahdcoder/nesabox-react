import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import React, { useState, useEffect } from 'react'
import DatabaseDetails from 'components/Databases'

const Databases = props => {
    const { server, match } = props
    const [databases, setDatabases] = useState([])
    const [databaseUsers, setDatabaseUsers] = useState([])
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        user: 'nesa',
        password: '',
        database_user_id: ''
    })

    useEffect(() => {
        client.get(`/servers/${server.id}/databases/${match.params.database}`)
            .then(({ data }) => {
                setDatabases(data.databases)
                setDatabaseUsers(data.database_users)
            })
            .catch(() => {
                toaster.danger('Failed fetching databases.')
            })
    }, [match.params.database, server.id])

    return (
        <DatabaseDetails
            {...props}
            form={form}
            errors={errors}
            setValue={setValue}
            submitting={submitting}
        />
    )
}

export default Databases
