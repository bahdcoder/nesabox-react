import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import Section from 'components/Section'
import styles from './SourceControlForm.css'
import { Text, Button } from 'evergreen-ui'

const SourceControlForm = ({
    providers,
    unlinking,
    unlinkProvider,
    redirectToProvider,
    isRedirecting = false
}) => {
    return (
        <React.Fragment>
            <Section
                title="Source code providers"
                description="This would enable DeployJs deploy code directly from Github, Gitlab and Bitbucket."
            >
                {providers.map((provider, index) => (
                    <div
                        key={provider.name}
                        className={css([
                            styles.providerContainer,
                            index !== providers.length - 1 && {
                                marginBottom: '2rem'
                            }
                        ])}
                    >
                        <div className={css(styles.provider)}>
                            <Svg
                                width={40}
                                height={40}
                                icon={provider.name}
                                name={provider.name}
                            />
                            <Text marginLeft={20} textTransform={'capitalize'}>
                                {provider.name}
                            </Text>
                        </div>

                        <div>
                            {!provider.connected && (
                                <Button
                                    isLoading={isRedirecting === provider.name}
                                    disabled={
                                        isRedirecting &&
                                        isRedirecting !== provider.name
                                    }
                                    onClick={() =>
                                        redirectToProvider(provider.name)
                                    }
                                    appearance="primary"
                                    intent="success"
                                >
                                    Connect
                                </Button>
                            )}
                            {provider.connected && (
                                <React.Fragment>
                                    <Button
                                        isLoading={
                                            isRedirecting === provider.name
                                        }
                                        disabled={
                                            isRedirecting &&
                                            isRedirecting !== provider.name
                                        }
                                        onClick={() =>
                                            redirectToProvider(provider.name)
                                        }
                                    >
                                        Refresh Token
                                    </Button>

                                    <Button
                                        marginLeft={10}
                                        isLoading={unlinking === provider.name}
                                        disabled={
                                            unlinking &&
                                            unlinking !== provider.name
                                        }
                                        onClick={() =>
                                            unlinkProvider(provider.name)
                                        }
                                        appearance="primary"
                                        intent="danger"
                                    >
                                        Unlink
                                    </Button>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                ))}
            </Section>
        </React.Fragment>
    )
}

export default SourceControlForm
