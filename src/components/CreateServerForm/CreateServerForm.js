import React from 'react'
import { css } from 'glamor'
import {
    Pane,
    Label,
    Alert,
    Link,
    Small,
    Button,
    Checkbox,
    SideSheet,
    withTheme,
    SelectField,
    TextInputField,
    SegmentedControl
} from 'evergreen-ui'
import { Link as RouterLink } from 'react-router-dom'

const CreateServerForm = ({
    form,
    theme,
    errors,
    regions,
    setValue,
    providers,
    submitting,
    setDatabase,
    handleSubmit,
    creatingServer,
    validProviders,
    setCreatingServer
}) => {
    return (
        <SideSheet
            isShown={creatingServer}
            onCloseComplete={() => setCreatingServer(false)}
        >
            <Pane width={'100%'} padding={40}>
                <React.Fragment>
                    <Label>Cloud provider *</Label>
                    <form onSubmit={handleSubmit}>
                        <SegmentedControl
                            marginTop={16}
                            width={'100%'}
                            marginBottom={16}
                            options={validProviders}
                            onChange={provider =>
                                setValue('provider', provider)
                            }
                        />

                        {validProviders.length === 1 && (
                            <Alert
                                marginTop={16}
                                marginBottom={16}
                                title="Looks like you haven't setup any cloud providers."
                            >
                                <Small
                                    className={css({
                                        color: theme.colors.text.muted
                                    })}
                                >
                                    Click{' '}
                                    <Link
                                        is={RouterLink}
                                        to="/account/applications"
                                    >
                                        here
                                    </Link>{' '}
                                    to connect your cloud providers.
                                </Small>
                            </Alert>
                        )}

                        <TextInputField
                            required
                            label="Name"
                            name={'name'}
                            value={form.name}
                            isInvalid={!!errors.name}
                            placeholder="polar-eyrie-65870"
                            validationMessage={errors.name}
                            onChange={e => setValue('name', e.target.value)}
                            hint="This would also be used as the hostname of the server."
                        />

                        {form.provider !== 'custom' && (
                            <React.Fragment>
                                <SelectField
                                    label="Credential"
                                    name={'credential_id'}
                                    value={form.credential_id}
                                    isInvalid={!!errors.credential_id}
                                    validationMessage={errors.credential_id}
                                    onChange={e =>
                                        setValue(
                                            'credential_id',
                                            e.target.value
                                        )
                                    }
                                >
                                    {(providers[form.provider] || []).map(
                                        credential => (
                                            <option
                                                key={credential.id}
                                                value={credential.id}
                                            >
                                                {credential.profileName}
                                            </option>
                                        )
                                    )}
                                </SelectField>

                                {regions && (
                                    <React.Fragment>
                                        <SelectField
                                            required
                                            name={'region'}
                                            label="Region"
                                            value={form.region}
                                            isInvalid={!!errors.region}
                                            validationMessage={errors.region}
                                            onChange={e =>
                                                setValue(
                                                    'region',
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select region
                                            </option>
                                            {(
                                                regions[form.provider]
                                                    .regions || []
                                            ).map(region => (
                                                <option
                                                    key={region.value}
                                                    value={region.value}
                                                >
                                                    {region.label}
                                                </option>
                                            ))}
                                        </SelectField>

                                        <SelectField
                                            required
                                            label="Size"
                                            name={'size'}
                                            value={form.size}
                                            isInvalid={!!errors.size}
                                            validationMessage={errors.size}
                                            onChange={e =>
                                                setValue('size', e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select size
                                            </option>
                                            {(
                                                regions[form.provider].sizes ||
                                                []
                                            ).map(size => (
                                                <option
                                                    key={size.value}
                                                    value={size.value}
                                                >
                                                    {size.label}
                                                </option>
                                            ))}
                                        </SelectField>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}

                        {form.provider === 'custom' && (
                            <React.Fragment>
                                <TextInputField
                                    required
                                    label="IP Address"
                                    name={'ip_address'}
                                    value={form.ip_address}
                                    placeholder="192.01.23.3"
                                    isInvalid={!!errors.ip_address}
                                    validationMessage={errors.ip_address}
                                    onChange={e =>
                                        setValue('ip_address', e.target.value)
                                    }
                                />

                                <TextInputField
                                    placeholder="192.01.23.32"
                                    name={'private_ip_address'}
                                    value={form.private_ip_address}
                                    label="Private IP Address (Optional)"
                                    isInvalid={!!errors.private_ip_address}
                                    validationMessage={
                                        errors.private_ip_address
                                    }
                                    onChange={e =>
                                        setValue(
                                            'private_ip_address',
                                            e.target.value
                                        )
                                    }
                                />

                                <TextInputField
                                    required
                                    label="Size"
                                    name="size"
                                    placeholder="4"
                                    value={form.size}
                                    hint={'RAM'}
                                    isInvalid={!!errors.size}
                                    validationMessage={errors.size}
                                    onChange={e =>
                                        setValue('size', e.target.value)
                                    }
                                />

                                <TextInputField
                                    name="region"
                                    label="Region"
                                    value={form.region}
                                    placeholder="S.E Asia"
                                    isInvalid={!!errors.region}
                                    validationMessage={errors.region}
                                    onChange={e =>
                                        setValue('region', e.target.value)
                                    }
                                    hint="This represents the location where your custom server was deployed."
                                />
                            </React.Fragment>
                        )}

                        <Label>Select databases to install</Label>
                        <Checkbox
                            label="Mongo DB"
                            checked={form.databases.includes('mongodb')}
                            onChange={() => setDatabase('mongodb')}
                        />
                        <Checkbox
                            label="Mysql"
                            checked={form.databases.includes('mysql')}
                            onChange={() => setDatabase('mysql')}
                        />

                        <Button
                            type="submit"
                            isLoading={submitting}
                            appearance="primary"
                            marginTop={32}
                        >
                            Create Server
                        </Button>
                    </form>
                </React.Fragment>
            </Pane>
        </SideSheet>
    )
}

export default withTheme(CreateServerForm)
