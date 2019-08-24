import React from 'react'
import { css } from 'glamor'
import Loader from 'components/Loader'

const Monitoring = ({ metrics, fetchingMetrics }) => {
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
                </div>
            )}
        </React.Fragment>
    )
}

export default Monitoring
