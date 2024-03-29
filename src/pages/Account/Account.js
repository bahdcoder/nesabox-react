import React from 'react'
import client from 'utils/axios'
import Sshkeys from 'pages/Sshkeys'
import { withAuth } from 'utils/hoc'
import APIToken from 'pages/APIToken'
import { useForm } from 'utils/hooks'
import { Helmet } from 'react-helmet'
import { toaster } from 'evergreen-ui'
import ProfileForm from 'components/ProfileForm'

const Account = ({ auth }) => {
    const [user, setUser] = auth

    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        name: user.name,
        email: user.email
    })

    const handleSubmit = e => {
        e.preventDefault()

        setSubmitting(true)

        client
            .put('/me', form)
            .then(({ data }) => {
                setUser(data)

                toaster.success('Profile Updated.')

                setSubmitting(false)
            })
            .catch(({ response }) => {
                setSubmitting(false)

                response &&
                    response.data &&
                    response.data.errors &&
                    setErrors(response.data.errors)
            })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Account</title>
            </Helmet>
            <ProfileForm
                form={form}
                user={user}
                errors={errors}
                setValue={setValue}
                submitting={submitting}
                handleSubmit={handleSubmit}
            />

            <Sshkeys
                keyEndpoint="/me/sshkeys"
                description="These keys will automatically be added to every server you create."
            />

            <APIToken />
        </React.Fragment>
    )
}

export default withAuth(Account)
