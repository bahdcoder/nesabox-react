import React, { Fragment } from 'react'
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
    setForm,
    setValue,
    providers,
    submitting,
    setDatabase,
    handleSubmit,
    creatingServer,
    validProviders,
    setCreatingServer
}) => (
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
                            setForm({
                                ...form,
                                provider,
                                credential_id:
                                    ((providers[provider] || [])[0] || {}).id ||
                                    ''
                            })
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

                    <SelectField
                        required
                        name={'type'}
                        value={form.type}
                        label="Server Type"
                        isInvalid={!!errors.type}
                        validationMessage={errors.type}
                        onChange={e => setValue('type', e.target.value)}
                        hint="If you need an Nginx only server, select the load balancer server type."
                    >
                        {[
                            {
                                name: 'Default',
                                value: 'default'
                            },
                            {
                                name: 'Load balancer',
                                value: 'load_balancer'
                            }
                        ].map(type => (
                            <option key={type.value} value={type.value}>
                                {type.name}
                            </option>
                        ))}
                    </SelectField>

                    {form.provider !== 'custom' && (
                        <React.Fragment>
                            <SelectField
                                label="Credential"
                                name={'credential_id'}
                                value={form.credential_id}
                                isInvalid={!!errors.credential_id}
                                validationMessage={errors.credential_id}
                                onChange={e =>
                                    setValue('credential_id', e.target.value)
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
                                            setValue('region', e.target.value)
                                        }
                                    >
                                        <option value="">Select region</option>
                                        {(
                                            (regions[form.provider] || {})
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
                                        <option value="">Select size</option>
                                        {(
                                            regions[form.provider].sizes || []
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
                                validationMessage={errors.private_ip_address}
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
                                onChange={e => setValue('size', e.target.value)}
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

                    {form.type !== 'load_balancer' && (
                        <Fragment>
                            <Label>Select databases to install</Label>
                            <Checkbox
                                label="Mongo DB v4.2"
                                checked={form.databases.includes('mongodb')}
                                onChange={() => setDatabase('mongodb')}
                            />
                            <Checkbox
                                label="Mysql v5.7"
                                checked={form.databases.includes('mysql')}
                                onChange={() => setDatabase('mysql')}
                            />
                            <Checkbox
                                label="Mysql v8"
                                checked={form.databases.includes('mysql8')}
                                onChange={() => setDatabase('mysql8')}
                            />
                            <Checkbox
                                label="MariaDB v10.13"
                                checked={form.databases.includes('mariadb')}
                                onChange={() => setDatabase('mariadb')}
                            />
                            <Checkbox
                                label="Postgresql v11"
                                checked={form.databases.includes('postgresql')}
                                onChange={() => setDatabase('postgresql')}
                            />
                        </Fragment>
                    )}

                    <Button
                        type="submit"
                        intent="success"
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

export default withTheme(CreateServerForm)
