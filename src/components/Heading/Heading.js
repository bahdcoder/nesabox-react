import React from 'react'
import { Heading as EvergreenHeading, withTheme } from 'evergreen-ui'

const Heading = ({ children, theme: { getFontFamily }, ...rest }) => (
    <EvergreenHeading fontFamily={getFontFamily()} {...rest}>
        {children}
    </EvergreenHeading>
)

export default withTheme(Heading)
