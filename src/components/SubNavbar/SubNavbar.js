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
                            to={item.to}
                            key={item.to}
                            color="neutral"
                            is={RouterLink}
                            textDecoration={'none'}
                        >
                            <Text
                                is="li"
                                className={css([
                                    styles.listItem,
                                    {
                                        textTransform: 'capitalize'
                                    },
                                    item.active && {
                                        borderBottom: `1px solid ${theme.palette.green.base}`
                                    },
                                ])}
                                color={
                                    item.active ? theme.palette.green.base : ''
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
