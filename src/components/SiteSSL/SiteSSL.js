import { css } from 'glamor'
import React, { useState } from 'react'
import { Button, Alert, Small, withTheme } from 'evergreen-ui'

import Section from 'components/Section'
import SegmentedControl from 'components/SegmentedControl'

const SiteSSL = ({ server, site, submitting, installCertificate, theme }) => {
    const sslOptions = [
        {
            icon: 'lock',
            name: 'lets_encrypt',
            title: 'Lets Encrypt',
            description: 'Free SSL certificate'
        }
    ]

    const [selected, setSelected] = useState(sslOptions[0])

    return (
        <Section
            title="Secure site"
            description="Secure your site with an SSL certificate"
        >
            {site.ssl_certificate_installed && (
                <Alert intent="success" marginBottom={16}>
                    <Small fontSize={12}>
                        Let's Encrypt certificate is installed and active.
                    </Small>
                </Alert>
            )}
            {!site.ssl_certificate_installed && (
                <React.Fragment>
                    <SegmentedControl
                        selected={selected}
                        options={sslOptions}
                        handleClick={setSelected}
                    />

                    <div
                        className={css({
                            marginTop: 32
                        })}
                    >
                        <Alert marginBottom={16}>
                            <Small fontSize={12}>
                                Make sure the DNS of your site is configured to
                                point to{' '}
                                <span
                                    className={css({
                                        color: theme.palette.green.base
                                    })}
                                >
                                    {server.ip_address}
                                </span>
                                . This would be verified when issuing
                                certificate.
                            </Small>
                        </Alert>
                        <Button
                            intent="success"
                            appearance="primary"
                            onClick={installCertificate}
                            isLoading={site.installing_certificate || submitting}
                        >
                            Install certificate
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </Section>
    )
}

export default withTheme(SiteSSL)
