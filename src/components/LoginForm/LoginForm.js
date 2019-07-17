import React from 'react'
import { css } from 'glamor'
import styles from './LoginForm.css'
import { Pane, withTheme, TextInputField, Button, Heading } from 'evergreen-ui'

const LoginForm = ({
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
                    marginBottom="1rem"
                    textAlign="center"
                    fontFamily={getFontFamily()}
                >
                    Login to DeployJs
                </Heading>

                <form onSubmit={handleSubmit}>
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
                        Log in
                    </Button>
                </form>
            </Pane>
        </div>
    )
}

export default withTheme(LoginForm)
