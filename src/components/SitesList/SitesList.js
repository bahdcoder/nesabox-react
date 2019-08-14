import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import Loader from 'components/Loader'
import EmptySet from 'components/EmptySet'
import Container from 'components/Container'
import { Link as RouterLink } from 'react-router-dom'
import ServerStatusIcon from 'components/ServerStatusIcon'
import {
    withTheme,
    Text,
    Link,
    SideSheet,
    Pane,
    Button,
    TextInputField
} from 'evergreen-ui'

import styles from './SitesList.css'

const SitesList = ({
    sites,
    server,
    creatingSite,
    setCreatingSite,
    theme,
    handleSubmit,
    submitting,
    form,
    errors,
    setValue
}) => {
    return (
        <React.Fragment>
            {!sites && <Loader />}
            {sites && sites.length === 0 && (
                <Container className={{ marginTop: '40' }}>
                    <EmptySet
                        heading="No sites on this server yet."
                        description="Once you provision a server, it'll show up here."
                        buttonLabel="Add new site"
                        handleAction={() => setCreatingSite(true)}
                    />
                </Container>
            )}

            {sites && sites.length > 0 && (
                <Container
                    className={{
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        intent="success"
                        appearance="primary"
                        onClick={() => setCreatingSite(true)}
                    >
                        Add Site
                    </Button>
                </Container>
            )}

            {sites &&
                sites.length > 0 &&
                sites.map(site => (
                    <Link
                        key={site.id}
                        is={RouterLink}
                        textDecoration={'none'}
                        to={`/servers/${server.id}/sites/${site.id}`}
                    >
                        <div
                            className={css([
                                styles.server,
                                {
                                    ':hover': {
                                        backgroundColor:
                                            theme.scales.neutral.N1,
                                        cursor: 'pointer'
                                    },
                                    borderBottom: `1px solid ${theme.scales.neutral.N4}`
                                }
                            ])}
                        >
                            <Container
                                className={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    className={css(styles.serverNameContainer)}
                                >
                                    <Svg
                                        width={24}
                                        height={24}
                                        icon={
                                            site.app_type === 'None'
                                                ? 'no-app'
                                                : site.app_type === 'git'
                                                ? site.repository_provider
                                                : site.app_type
                                        }
                                    />

                                    <Text marginLeft={16}>{site.name}</Text>
                                </div>

                                <div className={css(styles.serverStatus)}>
                                    <Text textTransform="capitalize">
                                        {site.app_type}
                                    </Text>
                                    <ServerStatusIcon status={site.status} />
                                    {/* <IconButton marginLeft='16' icon='full-circle' appearance='minimal' /> */}
                                </div>
                            </Container>
                        </div>
                    </Link>
                ))}

            <SideSheet
                isShown={creatingSite}
                onCloseComplete={() => setCreatingSite(false)}
            >
                <Pane width={'100%'} padding={40}>
                    <React.Fragment>
                        <form onSubmit={handleSubmit}>
                            <TextInputField
                                required
                                label="Name"
                                name={'name'}
                                value={form.name}
                                isInvalid={!!errors.name}
                                validationMessage={errors.name}
                                placeholder="docs.google-apps.com"
                                onChange={e => setValue('name', e.target.value)}
                                hint="This would also be used as the domain name of your site."
                            />

                            <TextInputField
                                required
                                label="Slug"
                                name={'slug'}
                                value={form.slug}
                                isInvalid={!!errors.slug}
                                validationMessage={errors.slug}
                                placeholder="evergreen-blog"
                                onChange={e => setValue('slug', e.target.value)}
                                hint={`${form.slug}.nesabox.com`}
                            />

                            <Button
                                type="submit"
                                intent="success"
                                isLoading={submitting}
                                appearance="primary"
                            >
                                Add Site
                            </Button>
                        </form>
                    </React.Fragment>
                </Pane>
            </SideSheet>
        </React.Fragment>
    )
}

export default withTheme(SitesList)
