import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { Dialog } from 'evergreen-ui'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import Section from 'components/Section'
import SshkeysList from 'components/SshkeysList'
import AddSshkeyForm from 'components/AddSshkeyForm'

const Sshkeys = ({ auth }) => {
    const [user, setUser] = auth
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        key: ''
    })

    const [deletingKeyId, setDeletingKeyId] = useState(null)

    const handleDeleteKey = () => {
        setSubmitting(true)

        client.delete(`/me/sshkeys/${deletingKeyId}`)
            .then(({ data }) => {
                setUser(data)
                setSubmitting(false)
                setDeletingKeyId(null)
                toaster.success('Public key deleted.')
            })
            .catch(({ response }) => {
                setSubmitting(false)
                setDeletingKeyId(null)
                toaster.danger('Failed deleting key.')
            })
    }

    const handleFormSubmit = closeDialog => {
        setSubmitting(true)

        client
            .post('/me/sshkeys', form)
            .then(({ data }) => {
                setSubmitting(false)

                setErrors({})

                setUser(data)

                resetForm()

                toaster.success('SSH Key added successfully.')

                closeDialog()
            })
            .catch(({ response }) => {
                setSubmitting(false)

                response && response.data && setErrors(response.data.errors)
            })
    }

    const [creatingKey, setCreatingKey] = useState(false)

    return (
        <Section
            title="SSH Keys"
            description="These keys will automatically be added to every server you create."
        >
            <SshkeysList openCreateKeyModal={() => setCreatingKey(true)} setDeletingKeyId={setDeletingKeyId} />

            <Dialog
                title="New SSH Key"
                isShown={creatingKey}
                confirmLabel="Add Key"
                onConfirm={handleFormSubmit}
                isConfirmLoading={submitting}
                onCancel={closeDialog => {
                    setErrors()
                    resetForm()
                    closeDialog()
                }}
                onCloseComplete={() => setCreatingKey(false)}
            >
                <AddSshkeyForm
                    form={form}
                    errors={errors}
                    setValue={setValue}
                    submitting={submitting}
                />
            </Dialog>

            <Dialog
                intent="danger"
                title="Delete SSH Key"
                isShown={!!deletingKeyId}
                confirmLabel="Delete SSH Key"
                onConfirm={handleDeleteKey}
                isConfirmLoading={submitting}
                onCancel={closeDialog => {
                    setDeletingKeyId(null)
                    closeDialog()
                }}
                onCloseComplete={() => setDeletingKeyId(null)}
            >
                Are you sure you want to delete this SSH Key ?
            </Dialog>
        </Section>
    )
}

export default withAuth(Sshkeys)
