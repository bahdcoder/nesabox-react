import React from 'react'
import { css } from 'glamor'
import { Spinner } from 'evergreen-ui'

import styles from './Loader.css'

const Loader = ({ size = 24 }) => {
    return (
        <div className={css(styles)}>
            <Spinner size={size} />
        </div>
    )
}

export default Loader
