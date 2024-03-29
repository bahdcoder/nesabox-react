import React from 'react'
import { css } from 'glamor'
import styles from './RegisterForm.css'
import { useBodyBackground } from 'utils/hooks'
import { Pane, withTheme, TextInputField, Button, Heading } from 'evergreen-ui'

const RegisterForm = ({
    form,
    setValue,
    submitting,
    handleSubmit,
    errors,
    theme: {
        colors: { background },
        getFontFamily
    }
}) => {
    useBodyBackground()

    return (
        <div className={css(styles.container)}>
            <Pane
                display="flex"
                padding="2rem"
                border="default"
                marginTop="12rem"
                flexDirection="column"
                justifyContent="center"
                backgroundColor={background.white}
            >
                <Heading
                    textAlign="center"
                    marginBottom="2.5rem"
                    fontFamily={getFontFamily()}
                >
                    Create a Free Nesabox account
                </Heading>

                <form onSubmit={handleSubmit}>
                    <TextInputField
                        required
                        name="name"
                        width="340px"
                        inputHeight={40}
                        label="Full Name"
                        value={form.name}
                        isInvalid={!!errors.name}
                        validationMessage={errors.name}
                        onChange={e => setValue('name', e.target.value)}
                    />

                    <TextInputField
                        required
                        name="email"
                        label="Email"
                        width="340px"
                        inputHeight={40}
                        value={form.email}
                        isInvalid={!!errors.email}
                        validationMessage={errors.email}
                        onChange={e => setValue('email', e.target.value)}
                    />

                    <TextInputField
                        required
                        width="340px"
                        name="password"
                        type="password"
                        label="Password"
                        inputHeight={40}
                        value={form.password}
                        isInvalid={!!errors.password}
                        validationMessage={errors.password}
                        onChange={e => setValue('password', e.target.value)}
                    />

                    <Button
                        isLoading={submitting}
                        type="submit"
                        intent="success"
                        height={40}
                        appearance="primary"
                        display="flex"
                        justifyContent="center"
                        width="100%"
                    >
                        Create Account
                    </Button>
                </form>
            </Pane>
        </div>
    )
}

export default withTheme(RegisterForm)
