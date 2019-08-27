import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import {
    withTheme,
    Popover,
    Avatar,
    Menu,
    Pane,
    Link,
    Autocomplete,
    TextInput
} from 'evergreen-ui'

import styles from './AppNavbar.css'

const AppNavbar = ({ theme, auth, history: { push } }) => {
    const [user, setUser] = auth

    const logout = () => {
        push('/')
        setUser(null)
    }

    return user ? (
        <nav
            className={css({
                ...styles.container,
                borderBottom: `3px solid ${theme.palette.green.base}`
            })}
        >
            <Link is={RouterLink} color={'green'} textDecoration={'none'} to={'/dashboard'}>
                Nesabox
            </Link>

            <div>
                <Autocomplete
                    onChange={changedItem => console.log(changedItem)}
                    items={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']}
                >
                    {({ getInputProps, getRef, inputValue }) => (
                        <TextInput
                            innerRef={getRef}
                            value={inputValue}
                            {...getInputProps()}
                            placeholder="Search Sites and Servers"
                        />
                    )}
                </Autocomplete>
            </div>

            <Popover
                trigger="hover"
                shouldCloseOnExternalClick
                content={
                    <Menu>
                        <Menu.Group>
                            <Menu.Item
                                icon="settings"
                                onSelect={() => push('/account')}
                            >
                                Account Settings
                            </Menu.Item>
                            <Menu.Item icon="people">Teams</Menu.Item>
                            <Menu.Item icon="document-open">
                                Tutorials
                            </Menu.Item>
                        </Menu.Group>
                        <Menu.Divider />
                        <Menu.Group>
                            <Menu.Item icon="log-out" onSelect={logout}>
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
