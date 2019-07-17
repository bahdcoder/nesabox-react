import { css } from 'glamor'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { ThemeContext, Button } from 'evergreen-ui'

import styles from './Navbar.css'

const Navbar = () => {
    const theme = useContext(ThemeContext)
    console.log(theme)

    return (
        <div className={css(styles.container)}>
            <span className={css(styles.logo)}>Deploy Js</span>

            <div>
                {/* <Link to='login' className={css(styles.authButtons.login)}>Login</Link> */}
                <Button
                    is={Link}
                    to="login"
                    appearance="minimal"
                    marginLeft="1rem"
                    intent="none"
                    height={40}
                >
                    Login
                </Button>
                <Button
                    appearance="primary"
                    intent="success"
                    marginLeft="1rem"
                    height={40}
                >
                    Sign Up For Free
                </Button>
            </div>
        </div>
    )
}

export default Navbar
