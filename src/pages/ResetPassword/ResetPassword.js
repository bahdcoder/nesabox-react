import React from 'react'
import { css } from 'glamor'
import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import AuthNavbar from 'components/AuthNavbar'
import {
    Pane,
    withTheme,
    TextInputField,
    Button,
    Heading,
    toaster
} from 'evergreen-ui'

const ResetPassword = ({
    theme: {
        colors: { background },
        getFontFamily
    },
    history,
    match
}) => {
    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        password: '',
        token: match.params.token
    })

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)

        client
            .post('/auth/reset-password', form)
            .then(() => {
                toaster.success('Password has been reset successfully.', {
                    description: 'Please sign in with your new password.'
                })

                history.push('/auth/login')
            })
            .catch(({ response }) => {
                if (response && response.data) {
                    setErrors(response.data.errors)

                    return
                }
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <>
            <AuthNavbar
                linkText="Login"
                link="/auth/login"
                text="Remembered your password ?"
            />
            <div
                className={css({
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                })}
            >
                <Pane
                    display="flex"
                    padding="2rem"
                    marginTop="12rem"
                    flexDirection="column"
                    justifyContent="center"
                    backgroundColor={background.white}
                    boxShadow="0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08)"
                >
                    <Heading
                        textAlign="center"
                        marginBottom="1.5rem"
                        fontFamily={getFontFamily()}
                    >
                        Reset Password
                    </Heading>

                    <form onSubmit={handleSubmit}>
                        <TextInputField
                            required
                            width="340px"
                            name="email"
                            type="email"
                            label="Email"
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
                            inputHeight={40}
                            label="New password"
                            value={form.password}
                            isInvalid={!!errors.password}
                            validationMessage={errors.password}
                            onChange={e => setValue('password', e.target.value)}
                        />

                        <Button
                            height={40}
                            width="100%"
                            type="submit"
                            display="flex"
                            intent="success"
                            appearance="primary"
                            isLoading={submitting}
                            justifyContent="center"
                        >
                            Reset Password
                        </Button>
                    </form>
                </Pane>
            </div>
        </>
    )
}

export default withTheme(ResetPassword)
