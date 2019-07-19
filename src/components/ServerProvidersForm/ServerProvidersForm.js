import React from 'react'
import Section from 'components/Section'
import {
    SideSheet,
    Pane,
    Label,
    SegmentedControl,
    TextInputField,
    Button
} from 'evergreen-ui'
import ServerProviderCredentials from 'components/ServerProviderCredentials'

const ServerProvidersForm = ({
    isAddingProvider,
    setIsAddingProvider,
    providers,
    form,
    errors,
    setValue,
    submitting,
    credentials,
    addCredential,
    deleteCredential,
    deletingCredential,
    setDeletingCredential
}) => {
    return (
        <Section
            title="Server providers"
            description="Connect cloud server providers. DeployJs will use these credentials to deploy servers for you."
        >
            <ServerProviderCredentials
                setDeletingCredential={setDeletingCredential}
                deletingCredential={deletingCredential}
                deleteCredential={deleteCredential}
                credentials={credentials}
                setIsAddingProvider={setIsAddingProvider}
            />

            <SideSheet
                isShown={isAddingProvider}
                onCloseComplete={() => setIsAddingProvider(false)}
            >
                <Pane width={'100%'} padding={40}>
                    <Label>Cloud provider *</Label>
                    <SegmentedControl
                        width={'100%'}
                        marginTop={10}
                        marginBottom={20}
                        options={providers}
                        value={form.provider}
                        onChange={provider => setValue('provider', provider)}
                    />

                    <TextInputField
                        required
                        name={'profileName'}
                        label={'Profile name'}
                        value={form.profileName}
                        placeholder={'Personal'}
                        isInvalid={!!errors.profileName}
                        validationMessage={errors.profileName}
                        onChange={e => setValue('profileName', e.target.value)}
                    />

                    {['vultr', 'aws'].includes(form.provider) && (
                        <TextInputField
                            required
                            name="apiKey"
                            label={'API Key'}
                            value={form.apiKey}
                            isInvalid={!!errors.apiKey}
                            validationMessage={errors.apiKey}
                            onChange={e => setValue('apiKey', e.target.value)}
                        />
                    )}

                    {form.provider === 'linode' && (
                        <TextInputField
                            required
                            type="password"
                            name={'accessToken'}
                            label={'Access Token'}
                            validationMessage={errors.accessToken}
                            isInvalid={!!errors.accessToken}
                            value={form.accessToken}
                            onChange={e =>
                                setValue('accessToken', e.target.value)
                            }
                        />
                    )}

                    {form.provider === 'aws' && (
                        <TextInputField
                            required
                            type="password"
                            name={'apiSecret'}
                            label={'API Secret'}
                            value={form.apiSecret}
                            validationMessage={errors.apiSecret}
                            isInvalid={!!errors.apiSecret}
                            onChange={e =>
                                setValue('apiSecret', e.target.value)
                            }
                        />
                    )}

                    {form.provider === 'digital-ocean' && (
                        <TextInputField
                            required
                            type="password"
                            name={'apiToken'}
                            label={'API Token'}
                            value={form.apiToken}
                            validationMessage={errors.apiToken}
                            isInvalid={!!errors.apiToken}
                            onChange={e => setValue('apiToken', e.target.value)}
                        />
                    )}

                    <Button
                        appearance="primary"
                        onClick={addCredential}
                        isLoading={submitting}
                    >
                        Add Credential
                    </Button>
                </Pane>
            </SideSheet>
        </Section>
    )
}

export default ServerProvidersForm
