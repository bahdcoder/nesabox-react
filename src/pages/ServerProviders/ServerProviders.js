import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import { Small, toaster } from 'evergreen-ui'
import ServerProvidersForm from 'components/ServerProvidersForm'

const ServerProviders = ({ auth }) => {
    const [user, setUser] = auth

    const providersList = []
    const [deletingCredential, setDeletingCredential] = useState(null)

    const providers = Object.keys(user.providers).map(provider => {
        providersList.push(
            ...(user.providers[provider] || []).map(i => ({ ...i, provider }))
        )

        return {
            label: <Small textTransform={'capitalize'}>{provider}</Small>,
            value: provider
        }
    })

    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        provider: 'digital-ocean',
        apiToken: '',
        accessToken: '',
        profileName: '',
        apiKey: '',
        apiSecret: ''
    })

    const [isAddingProvider, setIsAddingProvider] = useState(false)

    const addCredential = () => {
        setSubmitting(true)

        client
            .post('/settings/server-providers', form)
            .then(({ data }) => {
                setUser(data)

                setIsAddingProvider(false)

                toaster.success(`${form.provider} credential added.`)
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)

                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const deleteCredential = () => {
        client
            .delete(`/settings/server-providers/${deletingCredential.id}`)
            .then(({ data }) => {
                setUser(data)

                toaster.success(
                    `Credential ${deletingCredential.profileName} deleted.`
                )
            })
            .catch(() => {
                toaster.danger(
                    'Failed deleting credential. Please try again later.'
                )
            })
            .finally(() => {
                setDeletingCredential(null)
            })
    }

    return (
        <React.Fragment>
            <ServerProvidersForm
                form={form}
                errors={errors}
                setValue={setValue}
                providers={providers}
                submitting={submitting}
                credentials={providersList}
                addCredential={addCredential}
                isAddingProvider={isAddingProvider}
                deleteCredential={deleteCredential}
                deletingCredential={deletingCredential}
                setIsAddingProvider={setIsAddingProvider}
                setDeletingCredential={setDeletingCredential}
            />
        </React.Fragment>
    )
}

export default withAuth(ServerProviders)
