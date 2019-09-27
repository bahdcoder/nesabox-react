import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import styles from './LoginForm.css'
import { useBodyBackground } from 'utils/hooks'
import { Pane, withTheme, Heading, Spinner } from 'evergreen-ui'

const LoginForm = ({
    submitting,
    redirectToProvider,
    theme: {
        colors: { background },
        getFontFamily
    }
}) => {
    useBodyBackground(background.tint1)

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

                <button
                    disabled={submitting}
                    onClick={redirectToProvider}
                    className={css({
                        width: '100%',
                        display: 'flex',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                        paddingTop: '0.7rem',
                        paddingBottom: '0.7rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                    }, submitting && {
                        background: '#fafafa',
                        cursor: 'not-allowed',
                        color: '#24292e'
                    }, !submitting && {
                        background: '#24292e',
                        ':hover': {
                            background: '#606f7b',
                        },
                        color: '#fff',
                    })}
                >
                    {!submitting && (
                        <Svg
                            icon="github_light"
                            className={css({
                                marginRight: '1rem'
                            })}
                            width={'1rem'}
                            height={'1rem'}
                        />
                    )}
                    {submitting && (
                        <Spinner marginRight={8} size={16} />
                    )}
                    Authenticate with Github
                </button>
            </Pane>
        </div>
    )
}

export default withTheme(LoginForm)
