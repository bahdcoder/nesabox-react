import React from 'react'
import { css } from 'glamor'
import Section from 'components/Section'
import {
    Table,
    IconButton,
    Button,
    SideSheet,
    Pane,
    Icon,
    TextInputField,
    Dialog,
    Text,
    withTheme
} from 'evergreen-ui'

const Network = ({
    server,
    form,
    theme,
    errors,
    setValue,
    addingRule,
    submitting,
    deleteRule,
    deletingRule,
    setAddingRule,
    setDeletingRule,
    handleFormSubmit,
}) => (
    <Section
        title="Active firewall rules"
        description="Manage UFW firewall rules from this panel."
    >
        <div>
            <div
                {...css({
                    width: '85%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                })}
            >
                <Button
                    intent="success"
                    marginBottom={16}
                    appearance="primary"
                    onClick={() => setAddingRule(true)}
                >
                    Add firewall rule
                </Button>
            </div>

            <Table>
                <Table.Head backgroundColor={'transparent'}>
                    <Table.TextHeaderCell paddingLeft={0}>
                        Name
                    </Table.TextHeaderCell>

                    <Table.TextHeaderCell>Port</Table.TextHeaderCell>

                    <Table.TextHeaderCell>
                        From IP Address
                    </Table.TextHeaderCell>

                    <Table.TextHeaderCell>Delete rule</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {server.firewall_rules.map(rule => (
                        <Table.Row key={rule.id} borderBottom={'none'}>
                            <Table.TextCell paddingLeft={0}>
                                {rule.name}
                            </Table.TextCell>
                            <Table.TextCell>{rule.port}</Table.TextCell>
                            <Table.TextCell>{rule.from}</Table.TextCell>

                            <Table.TextCell>
                                {rule.installing_firewall_rule ? (
                                    <Icon marginLeft={8} className='rotate animated infinite' icon='social-media' size={16} />
                                    ): (
                                    <IconButton onClick={() => setDeletingRule(rule)} icon="trash" intent="danger" />
                                )}
                            </Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>

        <SideSheet
            isShown={addingRule}
            onCloseComplete={() => setAddingRule(false)}
        >
            <Pane width={'100%'} padding={40}>
                <React.Fragment>
                    <form onSubmit={handleFormSubmit}>
                        <TextInputField
                            required
                            name="name"
                            label="Name"
                            inputWidth="100%"
                            inputHeight={40}
                            value={form.name}
                            isInvalid={!!errors.name}
                            validationMessage={errors.name}
                            onChange={e => setValue('name', e.target.value)}
                        />

                        <TextInputField
                            required
                            name="port"
                            label="Port"
                            inputWidth="100%"
                            inputHeight={40}
                            value={form.port}
                            isInvalid={!!errors.port}
                            validationMessage={errors.port}
                            onChange={e => setValue('port', e.target.value)}
                        />

                        <TextInputField
                            name="from"
                            inputWidth="100%"
                            inputHeight={40}
                            value={form.from}
                            label="From IP Address"
                            isInvalid={!!errors.from}
                            validationMessage={errors.from}
                            onChange={e => setValue('from', e.target.value)}
                            hint="Separate ip addresses by commas. If left empty, this port will be available from anywhere."
                        />

                        <Button
                            type="submit"
                            marginTop={16}
                            intent="success"
                            appearance="primary"
                            isLoading={submitting}
                        >
                            Add rule
                        </Button>
                    </form>
                </React.Fragment>
            </Pane>
        </SideSheet>

        {deletingRule && (
            <Dialog
                isShown={true}
                intent='danger'
                onConfirm={deleteRule}
                title="Delete firewall rule"
                onCloseComplete={() => setDeletingRule(null)}
            >
                <Text width='100%' minHeight={40} display='flex' justifyContent='center' alignItems='center'>
                    Are you sure you want to delete rule <span className={css({
                        padding: '0 5px',
                        color: theme.colors.intent.danger
                    })}>{deletingRule.name}</span>
                </Text>
            </Dialog>
        )}
    </Section>
)

export default withTheme(Network)
