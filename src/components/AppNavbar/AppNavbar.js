import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import { withTheme, Popover, Avatar, Menu, Pane, Link } from 'evergreen-ui'

import styles from './AppNavbar.css'

const AppNavbar = ({ theme, auth, history: { push } }) => {
    const [user, , setLogout] = auth

    return user ? (
        <nav
            className={css({
                ...styles.container,
                borderBottom: `3px solid ${theme.palette.green.base}`
            })}
        >
            <Link
                is={RouterLink}
                color={'green'}
                textDecoration={'none'}
                to={'/'}
            >
                Nesabox
            </Link>

            <Popover
                trigger="hover"
                shouldCloseOnExternalClick
                content={
                    <Menu>
                        <Menu.Group>
                            <RouterLink
                                to="/account"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.colors.text.default
                                }}
                            >
                                <Menu.Item icon="settings">
                                    Account Settings
                                </Menu.Item>
                            </RouterLink>
                            <RouterLink
                                to="/account/teams"
                                style={{
                                    textDecoration: 'none',
                                    color: theme.colors.text.default
                                }}
                            >
                                <Menu.Item icon="people">Teams</Menu.Item>
                            </RouterLink>
                            <a
                                style={{
                                    textDecoration: 'none',
                                    color: theme.colors.text.default
                                }}
                                target="_blank"
                                href="https://nesabox.com/knowledge-base"
                                rel="noopener noreferrer"
                            >
                                <Menu.Item icon="document-open">
                                    Knowledge Base
                                </Menu.Item>
                            </a>
                        </Menu.Group>
                        <Menu.Divider />
                        <Menu.Group>
                            <Menu.Item
                                icon="log-out"
                                onSelect={() =>
                                    setLogout(() => push('/auth/login'))
                                }
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Group>
                    </Menu>
                }
            >
                <Pane>
                    <Avatar
                        isSolid
                        src={user.photo_url}
                        name={user.name}
                        size={32}
                    />
                </Pane>
            </Popover>
        </nav>
    ) : null
}

export default withRouter(withAuth(withTheme(AppNavbar)))
