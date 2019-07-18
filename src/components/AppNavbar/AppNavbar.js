import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import { withRouter } from 'react-router-dom'
import {
    withTheme,
    Popover,
    Avatar,
    Menu,
    Pane,
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

    return (
        <nav
            className={css({
                ...styles.container,
                borderBottom: `3px solid ${theme.palette.blue.base}`
            })}
        >
            <span>Deploy Js</span>

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
    )
}

export default withRouter(withAuth(withTheme(AppNavbar)))