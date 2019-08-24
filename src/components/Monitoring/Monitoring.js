import React from 'react'
import { css } from 'glamor'
import Loader from 'components/Loader'

const Monitoring = ({ metrics, fetchingMetrics }) => {
    console.log('>>>>>>>>', metrics)
    return (
        <React.Fragment>
            {!metrics && fetchingMetrics && <Loader />}
            {!fetchingMetrics && metrics && (
                <div
                    {...css({
                        marginTop: 48,
                        display: 'flex',
                        width: '80%',
                        justifyContent: 'center'
                    })}
                >
                    {/* <Chart
                        width={'100%'}
                        height={300}
                        chartType="Line"
                        loader={<Loader />}
                        data={[
                            metrics.labels,
                            ...metrics.data
                        ]}
                        options={{
                            title: 'Population of Largest U.S. Cities',
                            chartArea: { width: '30%' },
                            hAxis: {
                                title: 'Total Population',
                                minValue: 0
                            },
                            vAxis: {
                                title: 'City'
                            }
                        }}
                        legendToggle
                /> */}
                </div>
            )}
        </React.Fragment>
    )
}

export default Monitoring
