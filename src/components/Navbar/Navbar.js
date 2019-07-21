import React from 'react'
import { css } from 'glamor'
import { Button } from 'evergreen-ui'
import { Link } from 'react-router-dom'

import styles from './Navbar.css'

const Navbar = () => {
    return (
        <div className={css(styles.container)}>
            <span className={css(styles.logo)}>Nesabox</span>

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
                    is={Link}
                    to="/register"
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
