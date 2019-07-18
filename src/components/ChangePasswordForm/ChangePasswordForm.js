import React from 'react'
import Section from 'components/Section'
import { TextInputField, Button } from 'evergreen-ui'

const ChangePasswordForm = ({
    form,
    setValue,
    submitting,
    errors,
    handleSubmit
}) => {
    return (
        <React.Fragment>
            <Section
                title="Change Password"
                description="When next you login, you would be required to use your new password."
            >
                <form onSubmit={handleSubmit}>
                    <TextInputField
                        type="password"
                        inputWidth="70%"
                        inputHeight={32}
                        name="current_password"
                        label="Current password"
                        value={form.current_password}
                        isInvalid={!!errors.current_password}
                        validationMessage={errors.current_password}
                        placeholder={'Enter your current password'}
                        onChange={e =>
                            setValue('current_password', e.target.value)
                        }
                    />

                    <TextInputField
                        type="password"
                        inputHeight={32}
                        inputWidth="70%"
                        name="new_password"
                        label="New password"
                        value={form.new_password}
                        placeholder="Enter a password"
                        hint="Password must be 8 characters or more"
                        isInvalid={!!errors.new_password}
                        validationMessage={errors.new_password}
                        onChange={e => setValue('new_password', e.target.value)}
                    />

                    <TextInputField
                        type="password"
                        inputHeight={32}
                        inputWidth="70%"
                        label="Confirm new password"
                        name="confirm_new_password"
                        value={form.new_password_confirmation}
                        placeholder="Enter the password again"
                        onChange={e =>
                            setValue(
                                'new_password_confirmation',
                                e.target.value
                            )
                        }
                    />

                    <Button
                        type="submit"
                        display="flex"
                        appearance="primary"
                        isLoading={submitting}
                        justifyContent="center"
                    >
                        Update Password
                    </Button>
                </form>
            </Section>
        </React.Fragment>
    )
}

export default ChangePasswordForm
