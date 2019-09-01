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
import Mongodb from 'components/Mongodb'

// import styles from './Databases.css'

const Databases = props => {
    const { match } = props

    return match.params.database === 'mongodb' ? (
        <Mongodb {...props} />
    ) : (
        <React.Fragment>
            <Section
                title={`${match.params.database} Databases`}
                description={`Manage your ${match.params.database} databases here.`}
            ></Section>

            <Section
                title={`${match.params.database} Database users`}
                description={`Manage your ${match.params.database} database users here.`}
            ></Section>
        </React.Fragment>
    )
}

export default withTheme(Databases)
