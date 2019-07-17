import React from 'react'
import { css } from 'glamor'

import styles from './Container.css'

const Container = ({ children }) => (
    <div className={css(styles)}>{children}</div>
)

export default Container
