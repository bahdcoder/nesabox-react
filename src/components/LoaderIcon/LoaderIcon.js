import React from 'react'
import { Icon, withTheme } from 'evergreen-ui'

const LoaderIcon = ({ theme }) => (
    <Icon
        marginLeft={8}
        icon="social-media"
        fill={theme.palette.blue.dark}
        className="rotate animated infinite"
    />
)

export default withTheme(LoaderIcon)
