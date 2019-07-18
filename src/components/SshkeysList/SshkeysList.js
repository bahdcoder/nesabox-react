import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import {
    Pane,
    Small,
    Link,
    Button,
    Table,
    IconButton,
    withTheme
} from 'evergreen-ui'

import Heading from 'components/Heading'

import styles from './SshkeysList.css'

const SshkeysList = ({ auth, theme, openCreateKeyModal, setDeletingKeyId }) => {
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
            {user.sshkeys.length > 0 && (
                <React.Fragment>
                    <header className={css(styles.header)}>
                        <Heading>Active SSH Keys</Heading>

                        <Button onClick={openCreateKeyModal}>Add</Button>
                    </header>

                    <div className={css(styles.table)}>
                        <Table>
                            <Table.Body>
                                {user.sshkeys.map(key => (
                                    <Table.Row key={key.id} borderBottom={'none'}>
                                        <Table.TextCell
                                            paddingRight={0}
                                            flex={'1 0 87%'}
                                            paddingLeft={0}
                                        >
                                            {key.name}
                                        </Table.TextCell>
                                        <Table.TextCell
                                            paddingRight={0}
                                            paddingLeft={0}
                                            flexGrow={1}
                                        >
                                            <IconButton
                                                icon="trash"
                                                intent="danger"
                                                onClick={() =>
                                                    setDeletingKeyId(key.id)
                                                }
                                            />
                                        </Table.TextCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default withTheme(withAuth(SshkeysList))
