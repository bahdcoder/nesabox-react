import client from 'utils/axios'
import { toaster } from 'evergreen-ui'
import React, { useState, useEffect } from 'react'
import MonitoringDetails from 'components/Monitoring'

const Monitoring = props => {
    const { server } = props
    const [metrics, setMetrics] = useState(null)
    const [fetchingMetrics, setFetchingMetrics] = useState(true)

    useEffect(() => {
        fetchMetrics()

        const fetchMetricsInterval = setInterval(() => {
            fetchMetrics()
        }, 10000)

        return () => clearInterval(fetchMetricsInterval)
    }, [])

    const fetchMetrics = () => {
        client
            .get(`/servers/${server.id}/metrics`)
            .then(({ data }) => {
                setMetrics(data)
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger('Failed fetching metrics.')
            })
            .finally(() => {
                setFetchingMetrics(false)
            })
    }

    return <MonitoringDetails {...props} metrics={metrics} fetchingMetrics={fetchingMetrics} />
}

export default Monitoring
