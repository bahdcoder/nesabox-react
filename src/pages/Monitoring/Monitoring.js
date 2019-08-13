import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState } from 'react'
import MonitoringDetails from 'components/Monitoring'

const Monitoring = props => {
    const [submitting, setSubmitting] = useState(false)

    const installMonitoring = () => {
        client
            .post(`/servers/${props.server.id}/install-monitoring`)
            .then(({ data }) => {
                props.setServer(data)

                toaster.success('Installation has been queued.')
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger('Failed installing monitoring.')
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <MonitoringDetails
            {...props}
            submitting={submitting}
            installMonitoring={installMonitoring}
        />
    )
}

export default Monitoring
