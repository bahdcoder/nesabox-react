import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import DatabaseDetails from 'components/Databases'

const Databases = props => {
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        command: '',
        user: 'nesa',
        password: ''
    })

    const [createNewUser, setCreateNewUser] = useState({
        mongodb: true,
        mysql: false
    })
    const [addingDatabase, setAddingDatabase] = useState({
        mongodb: false,
        mysql: false
    })
    const [deletingDatabase, setDeletingDatabase] = useState(false)

    const handleFormSubmit = type => {
        setSubmitting(true)

        client
            .post(`/servers/${props.server.id}/databases`, {
                ...form,
                type,
                user: createNewUser[type] ? form.user : undefined,
                password: createNewUser[type] ? form.password : undefined,
            })
            .then(({ data }) => {
                toaster.success('Database successfully added.')

                props.setServer(data)

                setAddingDatabase({
                    ...addingDatabase,
                    [type]: false
                })

                resetForm()
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)

                response && response.message && toaster.danger(response.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const deleteDatabase = (delete_user = false) => {
        if (submitting) return

        setSubmitting({ delete_user })

        client
            .delete(
                `/servers/${props.server.id}/databases/${deletingDatabase.id}?delete_user=${delete_user}`
            )
            .then(({ data }) => {
                toaster.success('Database successfully deleted.')

                props.setServer(data)
            })
            .catch(({ response }) => {
                toaster.danger('Failed deleting database.')
            })
            .finally(() => {
                setSubmitting(false)
                setDeletingDatabase(false)
            })
    }

    return (
        <DatabaseDetails
            {...props}
            form={form}
            errors={errors}
            setValue={setValue}
            submitting={submitting}
            createNewUser={createNewUser}
            deleteDatabase={deleteDatabase}
            addingDatabase={addingDatabase}
            deletingDatabase={deletingDatabase}
            handleFormSubmit={handleFormSubmit}
            setCreateNewUser={setCreateNewUser}
            setAddingDatabase={setAddingDatabase}
            setDeletingDatabase={setDeletingDatabase}
        />
    )
}

export default Databases