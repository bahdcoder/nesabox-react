import { css } from 'glamor'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import Section from 'components/Section'
import { Dialog, Text } from 'evergreen-ui'
import SshkeysList from 'components/SshkeysList'
import AddSshkeyForm from 'components/AddSshkeyForm'

const Sshkeys = ({
    auth,
    description,
    keyEndpoint,
    type,
    server,
    setServer,
    ...rest
}) => {
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

        client
            .delete(`${keyEndpoint}/${deletingKeyId}`)
            .then(({ data }) => {
                type === 'server' ? setServer(data) : setUser(data)

                setSubmitting(false)
                setDeletingKeyId(null)
                toaster.success('Public key deleted.')
            })
            .catch(error => {
                setSubmitting(false)
                setDeletingKeyId(null)
                toaster.danger('Failed deleting key.')
            })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post(keyEndpoint, form)
            .then(({ data }) => {
                setSubmitting(false)

                setErrors({})

                type === 'server' ? setServer(data) : setUser(data)

                resetForm()

                setCreatingKey(false)

                toaster.success('SSH Key added successfully.')
            })
            .catch(({ response }) => {
                setSubmitting(false)

                response && response.data && setErrors(response.data.errors)
            })
    }

    const [creatingKey, setCreatingKey] = useState(false)

    return (
        <Section title="SSH Keys" description={description}>
            <SshkeysList
                setDeletingKeyId={setDeletingKeyId}
                openCreateKeyModal={() => setCreatingKey(true)}
                sshkeys={type === 'server' ? server.sshkeys : user.sshkeys}
            />

            <AddSshkeyForm
                {...rest}
                form={form}
                errors={errors}
                setValue={setValue}
                submitting={submitting}
                creatingKey={creatingKey}
                setCreatingKey={setCreatingKey}
                handleFormSubmit={handleFormSubmit}
            />

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
                <div className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                })}>
                    <Text>
                        Are you sure you want to delete this SSH Key ?
                    </Text>
                </div>
            </Dialog>
        </Section>
    )
}

export default withAuth(Sshkeys)
