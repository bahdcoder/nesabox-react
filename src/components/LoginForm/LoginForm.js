import React from 'react'
import { css } from 'glamor'
import styles from './LoginForm.css'
import { useBodyBackground } from 'utils/hooks'
import GithubButton from 'components/GithubButton'
import { Link as RouterLink } from 'react-router-dom'
import { Pane, withTheme, TextInputField, Button, Heading, Text, Checkbox } from 'evergreen-ui'
import { Link } from 'evergreen-ui/commonjs/typography'

const LoginForm = ({
    form,
    errors,
    setValue,
    submitting,
    handleSubmit,
    redirectToProvider,
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
                // border="default"
                marginTop="12rem"
                flexDirection="column"
                justifyContent="center"
                backgroundColor={background.white}
                boxShadow='0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08)'
            >
                <Heading
                    textAlign="center"
                    marginBottom="1.5rem"
                    fontFamily={getFontFamily()}
                >
                    Login to Nesabox
                </Heading>

                <GithubButton
                    label='Login'
                    submitting={submitting}
                    redirectToProvider={redirectToProvider}
                />

                <Text display='inline-block' margin='0.8rem' textAlign='center'>Or Login With Email</Text>

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

                    <div className={css({
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                        justifyContent: 'space-between'
                    })}>
                        <Checkbox checked={form.rememberMe} onChange={() => setValue('rememberMe', !form.rememberMe)} label='Remember me' />

                        <Link color={'green'}
                    textDecoration={'none'} to='/auth/forgot-password' is={RouterLink}>Forgot Password ?</Link>
                    </div>

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
