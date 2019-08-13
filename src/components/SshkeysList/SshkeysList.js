import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import EmptySet from 'components/EmptySet'
import {
    Icon,
    Small,
    Link,
    Button,
    Table,
    IconButton,
    withTheme
} from 'evergreen-ui'

import Heading from 'components/Heading'

import styles from './SshkeysList.css'

const SshkeysList = ({
    theme,
    openCreateKeyModal,
    setDeletingKeyId,
    sshkeys
}) => {
    return (
        <React.Fragment>
            {sshkeys.length === 0 && (
                <EmptySet
                    renderHeading={() => (
                        <Heading marginBottom={10}>
                            No SSH Keys have been added yet.
                        </Heading>
                    )}
                    renderDescription={() => (
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
                    )}
                    renderButton={() => (
                        <Button
                            onClick={openCreateKeyModal}
                            marginTop={20}
                            appearance="primary"
                            intent="success"
                        >
                            Add SSH Key
                        </Button>
                    )}
                />
            )}
            {sshkeys.length > 0 && (
                <React.Fragment>
                    <header className={css(styles.header)}>
                        <Heading>Active SSH Keys</Heading>

                        <Button onClick={openCreateKeyModal}>Add</Button>
                    </header>

                    <div className={css(styles.table)}>
                        <Table>
                            <Table.Body>
                                {sshkeys.map(key => (
                                    <Table.Row
                                        key={key.id}
                                        borderBottom={'none'}
                                    >
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
                                            {key.isReady ? (
                                                <IconButton
                                                    icon="trash"
                                                    intent="danger"
                                                    onClick={() =>
                                                        setDeletingKeyId(key.id)
                                                    }
                                                />
                                            ) : (
                                                <Icon
                                                    className="rotate animated infinite"
                                                    marginLeft={8}
                                                    icon="social-media"
                                                    fill={theme.scales.blue.B9}
                                                />
                                            )}
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
