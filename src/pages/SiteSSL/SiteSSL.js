import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import SiteSSLDetails from 'components/SiteSSL'

const SiteSSL = props => {
    const { site, server, setSite } = props
    const [submitting, setSubmitting] = useState(site.installing_certificate)

    const installCertificate = () => {
        setSubmitting(true)

        client.post(`servers/${server.id}/sites/${site.id}/lets-encrypt`)
            .then(({ data }) => {
                setSite(data)

                toaster.success('Certificate is being issued.')
            })
            .catch(() => {
                toaster.danger('An error occurred.')
            })
    }

    return <SiteSSLDetails submitting={submitting} installCertificate={installCertificate} {...props} />
}

export default SiteSSL
