import React from 'react'
import { css } from 'glamor'
import { Spinner } from 'evergreen-ui'

import styles from './Loader.css'

const Loader = ({ size = 24, noPadding }) => {
    return (
        <div
            className={css([
                styles,
                !noPadding && {
                    padding: '40px'
                }
            ])}
        >
            <Spinner size={size} />
        </div>
    )
}

export default Loader
