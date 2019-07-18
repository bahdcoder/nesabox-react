import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import { Pane, Small, Link, Button, withTheme } from 'evergreen-ui'

import Heading from 'components/Heading'

const SshkeysList = ({ auth, theme, openCreateKeyModal }) => {
    const [user] = auth

    return (
        <React.Fragment>
            {user.sshkeys.length === 0 && (
                <Pane
                    width={'100%'}
                    display="flex"
                    padding="1rem"
                    border="default"
                    borderRadius={3}
                    background="tint1"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Heading marginBottom={10}>
                        There are no SSH Keys yet
                    </Heading>
                    <Small
                        className={css({
                            color: theme.colors.text.muted
                        })}
                    >
                        Need help generating an SSH Key ? Checkout{' '}
                        <Link
                            href="https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/create-with-putty/"
                            target="_blank"
                        >
                            this article for Windows
                        </Link>{' '}
                        and{' '}
                        <Link
                            target="_blank"
                            href="https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/create-with-openssh/"
                        >
                            this one for Mac OS / Linux{' '}
                        </Link>
                        .
                    </Small>

                    <Button
                        onClick={openCreateKeyModal}
                        marginTop={20}
                        appearance="primary"
                    >
                        Add SSH Key
                    </Button>
                </Pane>
            )}
        </React.Fragment>
    )
}

export default withTheme(withAuth(SshkeysList))
