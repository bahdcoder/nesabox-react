import React from 'react'
import { css } from 'glamor'
import styles from './SubNavbar.css'
import { withTheme, Text, Link } from 'evergreen-ui'
import { Link as RouterLink } from 'react-router-dom'

// components
import Container from 'components/Container'

const SubNavbar = ({ items, theme }) => {
    return (
        <nav
            className={css({
                ...styles.nav,
                borderBottom: `1px solid ${theme.palette.neutral.light}`
            })}
        >
            <Container>
                <ul className={css(styles.unorderedList)}>
                    {items.map((item, index) => (
                        <Link
                            key={item.to}
                            textDecoration={'none'}
                            color="neutral"
                            is={RouterLink}
                            to={item.to}
                        >
                            <Text
                                is="li"
                                className={css([
                                    styles.listItem,
                                    item.active && {
                                        borderBottom: `1px solid ${theme.palette.blue.base}`
                                    }
                                ])}
                                color={
                                    item.active ? theme.palette.blue.base : ''
                                }
                                key={index}
                            >
                                {item.label}
                            </Text>
                        </Link>
                    ))}
                </ul>
            </Container>
        </nav>
    )
}

export default withTheme(SubNavbar)
