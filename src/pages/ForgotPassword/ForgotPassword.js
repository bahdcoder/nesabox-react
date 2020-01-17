import React from 'react'
import { css } from 'glamor'
import client from 'utils/axios'
import { useForm } from 'utils/hooks'
import AuthNavbar from 'components/AuthNavbar'
import { Pane, withTheme, TextInputField, Button, Heading, toaster } from 'evergreen-ui'

const ForgotPassword = ({
    theme: {
        colors: { background },
        getFontFamily
    }
}) => {
    const [
        [form, setValue],
        [submitting, setSubmitting],
        [errors, setErrors]
    ] = useForm({
        email: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)

        client.post('/auth/forgot-password', form)
            .then(() => {
                toaster.success('Password reset mail has been sent. Please check your mail to reset your password.')
            })
            .catch(() => {
                setErrors({
                    email: ['Something went wrong.']
                })
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <>
            <AuthNavbar linkText='Login' link='/auth/login' text='Remembered your password ?' />
            <div className={css({
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            })}>
                <Pane
                    display="flex"
                    padding="2rem"
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
                        Send Password Reset Link
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
                            Send reset Link
                        </Button>
                    </form>
                </Pane>
            </div>
        </>
    )
}

export default withTheme(ForgotPassword)
