import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import { Dialog } from 'evergreen-ui'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import Section from 'components/Section'
import SshkeysList from 'components/SshkeysList'
import AddSshkeyForm from 'components/AddSshkeyForm'

const Sshkeys = ({ auth }) => {
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: '',
        key: ''
    })

    const handleFormSubmit = closeDialog => {
        setSubmitting(true)

        client
            .post('/me/sshkeys', form)
            .then(() => {
                setSubmitting(false)

                setErrors({})

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
            <SshkeysList openCreateKeyModal={() => setCreatingKey(true)} />

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
        </Section>
    )
}

export default withAuth(Sshkeys)
