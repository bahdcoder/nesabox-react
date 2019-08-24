import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import React, { useState } from 'react'
import { toaster } from 'evergreen-ui'
import SitesList from 'components/SitesList'

const Sites = ({ setServer, server }) => {
    const [
        [form, setValue, resetForm],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: ''
    })

    const [creatingSite, setCreatingSite] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .post(`/servers/${server.id}/sites`, form)
            .then(({ data }) => {
                toaster.success('Site added.')

                setServer(data)

                resetForm()

                setCreatingSite(false)
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <SitesList
            form={form}
            errors={errors}
            server={server}
            setValue={setValue}
            sites={server.sites}
            resetForm={resetForm}
            setServer={setServer}
            setErrors={setErrors}
            submitting={submitting}
            handleSubmit={handleSubmit}
            creatingSite={creatingSite}
            setSubmitting={setSubmitting}
            setCreatingSite={setCreatingSite}
        />
    )
}

export default Sites
