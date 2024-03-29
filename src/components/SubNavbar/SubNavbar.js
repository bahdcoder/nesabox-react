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
                                color={
                                    item.active ? theme.palette.green.base : ''
                                }
                                alignItems="center"
                                cursor="pointer"
                                paddingLeft="1rem"
                                paddingRight="1rem"
                                display="flex"
                                height="100%"
                                key={index}
                                textTransform="capitalize"
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
