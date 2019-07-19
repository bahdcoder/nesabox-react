import React from 'react'
import { css } from 'glamor'

import styles from './Container.css'

const Container = ({ children, className = {} }) => (
    <div
        className={css({
            ...styles,
            ...className
        })}
    >
        {children}
    </div>
)

export default Container
