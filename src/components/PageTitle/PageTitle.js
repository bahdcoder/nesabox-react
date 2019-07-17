import React from 'react'
import { css } from 'glamor'
import styles from './PageTitle.css'
import { withTheme } from 'evergreen-ui'
// components
import Heading from 'components/Heading'
import Container from 'components/Container'

const PageTitle = ({ children, title, theme }) => (
    <div
        className={css({
            ...styles.container,
            backgroundColor: theme.scales.neutral.N1,
            borderBottom: `1px solid ${theme.palette.neutral.light}`
        })}
    >
        <Container>{children || <Heading>{title}</Heading>}</Container>
    </div>
)

export default withTheme(PageTitle)
