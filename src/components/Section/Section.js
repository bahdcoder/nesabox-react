import React from 'react'
import { css } from 'glamor'
import styles from './Section.css'
import Heading from 'components/Heading'
import { Text, withTheme } from 'evergreen-ui'

const Section = ({ title, description, children, theme }) => (
    <div
        className={css({
            ...styles.container,
            borderBottom: `1px solid ${theme.palette.neutral.light}`
        })}
    >
        <div className={css(styles.title)}>
            <Heading marginBottom={16} color={theme.palette.blue.base}>
                {title}
            </Heading>
            <Text>{description}</Text>
        </div>

        <div className={css(styles.content)}>{children}</div>
    </div>
)

export default withTheme(Section)
