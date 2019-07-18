import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import { Table, IconButton, Heading, Button } from 'evergreen-ui'

import styles from './ServerProviderCredentials.css'

const ServerProviderCredentials = ({ credentials = [], setIsAddingProvider }) => {
    return (
        <React.Fragment>
            <header className={css(styles.header)}>
                <Heading>Active provider credentials</Heading>

                <Button onClick={() => setIsAddingProvider(true)}>Add</Button>
            </header>
            <Table className={css(styles.table)}>
                <Table.Body>
                    {credentials.map(key => (
                        <Table.Row key={key.id} borderBottom={'none'}>
                            <Table.TextCell
                                paddingRight={0}
                                flex={'1 0 87%'}
                                paddingLeft={0}
                                
                                textTransform={'capitalize'}
                            >
                                {key.profileName}
                            </Table.TextCell>
                            <Table.TextCell
                                flexGrow={1}
                                paddingLeft={0}
                                paddingRight={0}
                            >
                                <IconButton icon="trash" intent="danger" />
                            </Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </React.Fragment>
    )
}

export default withAuth(ServerProviderCredentials)
