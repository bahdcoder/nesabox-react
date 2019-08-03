import React from 'react'
import { css } from 'glamor'
import client from 'utils/axios'
import { Small } from 'evergreen-ui'
import { useForm } from 'utils/hooks'
import { Button, TextInput, Alert, toaster, withTheme } from 'evergreen-ui'

const UpdateSiteSlug = ({ site, server, setServer, theme }) => {
    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        slug: site.slug
    })

    const updateSiteSlug = () => {
        setSubmitting(true)

        client
            .put(`/servers/${server.id}/sites/${site.id}`, form)
            .then(({ data }) => {
                setServer(data)

                setErrors({})

                toaster.success('Slug is being updated.')
            })
            .catch(({ response }) => {
                response && response.data && setErrors(response.data.errors)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <React.Fragment>
            <div
                {...css({
                    display: 'flex',
                    width: '100%'
                })}
            >
                <TextInput
                    value={form.slug}
                    isInvalid={!!errors.slug}
                    onChange={e => setValue('slug', e.target.value)}
                    marginRight={24}
                />

                <Button
                    appearance={'primary'}
                    onClick={updateSiteSlug}
                    isLoading={submitting || site.updating_slug}
                >
                    Update
                </Button>
            </div>

            {errors && errors.slug && (
                <Small
                    color={theme.palette.red.base}
                    display="block"
                    marginTop={16}
                >
                    {errors.slug}
                </Small>
            )}

            <Alert marginTop={16} intent="danger">
                Updating this would update the subdomain your application is
                available at.
            </Alert>
        </React.Fragment>
    )
}

export default withTheme(UpdateSiteSlug)
