import React from 'react'
import { css } from 'glamor'
import {
    SideSheet,
    TextInputField,
    SelectField,
    Label,
    Pane,
    Button,
    Table,
    Switch,
    Heading,
    withTheme,
    IconButton,
    Dialog,
    Text,
    Icon
} from 'evergreen-ui'
import Section from 'components/Section'
import EmptySet from 'components/EmptySet'

import styles from './Databases.css'

const Databases = ({
    form,
    theme,
    server,
    errors,
    setValue,
    submitting,
    createNewUser,
    deleteDatabase,
    addingDatabase,
    handleFormSubmit,
    setCreateNewUser,
    deletingDatabase,
    setAddingDatabase,
    setDeletingDatabase,
    match,
    ...rest
}) => (
    <React.Fragment>
        <Section title={`${match.params.database} Databases`} description={`Manage your ${match.params.database} databases here.`}>

        </Section>
    </React.Fragment>
)

export default withTheme(Databases)
