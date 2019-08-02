import React from 'react'
import Ace from 'react-ace'
import { css } from 'glamor'
import Section from 'components/Section'
import UpdateSiteSlug from 'components/UpdateSiteSlug'
import { Button, TextInput, IconButton, withTheme } from 'evergreen-ui'

import styles from './SiteSettings.css'

import 'brace/mode/json'
import 'brace/theme/textmate'

const SiteSettings = ({ site, server, theme, working, configFile, setConfigurationFile, setConfigFile, getConfigurationFile }) => {
    return (
        <React.Fragment>
            <Section title="Site slug" description="This site slug would be used as your nesabox subdomain.">
                <UpdateSiteSlug server={server} site={site} />
            </Section>
            <Section
                title="Configuration file"
                description="Here you can edit / update your ghost configuration file directly and securely over SSH."
            >
                <div>
                    {!configFile && (
                        <Button
                            isLoading={working}
                            onClick={getConfigurationFile}
                        >
                            Edit config.production.json file
                        </Button>
                    )}

                    {configFile && (
                        <div className={css({
                            padding: 16,
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            border: `1px solid ${theme.palette.neutral.light}`
                        })}>
                            <Ace
                                mode="json"
                                width='100%'
                                theme="textmate"
                                value={configFile}
                                showGutter={false}
                                showPrintMargin={false}
                                onChange={content => setConfigFile(content)}
                                name='ghost-config-production-json'
                                editorProps={{
                                    showGutter: false,
                                    showLineNumbers: false
                                }}
                            />
                        </div>
                    )}

                    {configFile && (
                        <div className={css({
                            width: '100%',
                            display: 'flex',
                            marginTop: 16,
                            justifyContent: 'flex-end'
                        })}>
                            <Button
                                intent="danger"
                                marginRight={16}
                                onClick={() => setConfigFile(null)}
                            >
                                Cancel
                            </Button>

                            <Button
                                isLoading={working}
                                appearance='primary'
                                onClick={setConfigurationFile}
                            >
                                Update config.production.json file
                            </Button>
                        </div>
                    )}
                </div>

                {/* <div className={css(styles.row)}>
                    <TextInput readOnly />
                    <TextInput readOnly marginLeft={24} />
                    <IconButton marginLeft={24} intent='danger' icon='trash' />
                </div> */}
            </Section>
        </React.Fragment>
    )
}

export default withTheme(SiteSettings)
