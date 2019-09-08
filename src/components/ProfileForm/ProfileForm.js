import React from 'react'
import Section from 'components/Section'
import { TextInputField, Button, Avatar, Text, Link } from 'evergreen-ui'

const ProfileForm = ({
    user,
    form,
    errors,
    setValue,
    submitting,
    handleSubmit
}) => {
    return (
        <React.Fragment>
            <Section
                title="Profile"
                description="Edit your profile details. Your email is required for logging in."
            >
                <form onSubmit={handleSubmit}>
                    <Avatar
                        src={user.photo_url}
                        name={user.name}
                        size={60}
                        marginBottom={20}
                        display="block"
                    />

                    <Text marginBottom={20} display="block">
                        Manage your using avatar {' '}
                        <Link href="https://github.com" target="_blank">
                            Github
                        </Link>{' '}
                    </Text>

                    <TextInputField
                        name="email"
                        type="email"
                        inputWidth="70%"
                        inputHeight={32}
                        value={form.email}
                        label="Email Address"
                        isInvalid={!!errors.email}
                        validationMessage={errors.email}
                        onChange={e => setValue('email', e.target.value)}
                    />

                    <TextInputField
                        name="name"
                        label="Name"
                        inputHeight={32}
                        inputWidth="70%"
                        value={form.name}
                        isInvalid={!!errors.name}
                        validationMessage={errors.name}
                        onChange={e => setValue('name', e.target.value)}
                    />

                    <Button
                        type="submit"
                        display="flex"
                        appearance="primary"
                        intent="success"
                        isLoading={submitting}
                        justifyContent="center"
                    >
                        Save Changes
                    </Button>
                </form>
            </Section>
        </React.Fragment>
    )
}

export default ProfileForm
