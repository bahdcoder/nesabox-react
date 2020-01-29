import React from 'react'
import { css } from 'glamor'
import { withAuth } from 'utils/hoc'
import {
    Table,
    IconButton,
    Heading,
    Button,
    Dialog,
    Text,
    Strong
} from 'evergreen-ui'
import EmptySet from 'components/EmptySet'

import styles from './ServerProviderCredentials.css'

const ServerProviderCredentials = ({
    credentials = [],
    setIsAddingProvider,
    deletingCredential,
    deleteCredential,
    setDeletingCredential
}) => {
    return credentials.length > 0 ? (
        <React.Fragment>
            <Dialog
                intent="danger"
                title="Delete Credential"
                onConfirm={deleteCredential}
                isShown={!!deletingCredential}
                confirmLabel="Delete Credential"
                onCloseComplete={() => setDeletingCredential(null)}
            >
                <Text>
                    Are you sure you want to delete credential{' '}
                    <Strong>
                        {' '}
                        {deletingCredential && deletingCredential.profileName}
                    </Strong>{' '}
                    ?
                </Text>
            </Dialog>
            <header className={css(styles.header)}>
                <Heading>Active provider credentials</Heading>

                <Button onClick={() => setIsAddingProvider(true)}>Add</Button>
            </header>
            <Table marginTop="2rem" width="70%">
                <Table.Head backgroundColor={'transparent'}>
                    <Table.TextHeaderCell
                        flex={'1 0 51%'}
                        paddingRight={0}
                        paddingLeft={0}
                    >
                        Profile name
                    </Table.TextHeaderCell>

                    <Table.TextHeaderCell flex={'1 0 30%'}>
                        Provider
                    </Table.TextHeaderCell>

                    <Table.TextHeaderCell
                        paddingRight={0}
                        paddingLeft={0}
                    ></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {credentials.map(credential => (
                        <Table.Row key={credential.id} borderBottom={'none'}>
                            <Table.TextCell
                                paddingRight={0}
                                flex={'1 0 51%'}
                                paddingLeft={0}
                                textTransform={'capitalize'}
                            >
                                {credential.profileName}
                            </Table.TextCell>
                            <Table.TextCell
                                flex={'1 0 30%'}
                                textTransform={'capitalize'}
                            >
                                {credential.provider}
                            </Table.TextCell>
                            <Table.TextCell
                                flexGrow={1}
                                paddingLeft={0}
                                paddingRight={0}
                            >
                                <IconButton
                                    onClick={() =>
                                        setDeletingCredential(credential)
                                    }
                                    icon="trash"
                                    intent="danger"
                                />
                            </Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </React.Fragment>
    ) : (
        <EmptySet
            heading="There are no server providers yet."
            buttonLabel="Add provider credential"
            handleAction={() => setIsAddingProvider(true)}
        />
    )
}

export default withAuth(ServerProviderCredentials)
