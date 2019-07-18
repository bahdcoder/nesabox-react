import { css } from 'glamor'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import React, { useState } from 'react'
import Section from 'components/Section'
import { TextInput, Button, toaster } from 'evergreen-ui'

import styles from './APIToken.css'

const APIToken = ({ auth }) => {
    const [user, setUser] = auth
    const [regenerating, setRegenerating] = useState(false)

    const copyToClipboard = () => {
        document.getElementById('api_token_input_field').select()
        document.execCommand('copy')
        toaster.success('Copied to clipboard.')
    }

    const regenerate = () => {
        setRegenerating(true)

        client
            .post('/me/apitoken')
            .then(({ data }) => {
                setUser(data)

                setRegenerating(false)

                toaster.success('API token regenerated.')
            })
            .catch(() => {
                setRegenerating(false)

                toaster.danger(
                    'Something went wrong regenerating token. Please try again later.'
                )
            })
    }

    return (
        <Section
            title="API Token"
            description="Using this token, third party clients like CI services can perform actions on your account."
        >
            <div className={css(styles.container)}>
                <TextInput
                    readOnly
                    width="80%"
                    name="api_token"
                    value={user.api_token}
                    id="api_token_input_field"
                />

                <Button onClick={copyToClipboard}>Copy</Button>
            </div>

            <Button
                marginTop={10}
                onClick={regenerate}
                isLoading={regenerating}
                appearance="primary"
            >
                Regenerate API Token
            </Button>
        </Section>
    )
}

export default withAuth(APIToken)
