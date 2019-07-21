import React from 'react'
import { Icon, withTheme } from 'evergreen-ui'

export const statusIcons = {
    active: {
        icon: 'tick-circle',
        color: 'success'
    },
    initializing: {
        icon: 'social-media',
        color: 'redTint'
    },
    new: {
        icon: 'social-media',
        color: 'redTint'
    }
}

const ServerStatusIcon = ({ status, theme }) => (
    statusIcons[status] ? <Icon
        className={
            [
                'initializing',
                'new'
            ].includes(status) &&
            'rotate animated infinite'
        }
        size={16}
        marginRight={16}
        marginLeft={16}
        icon={
            statusIcons[status]
                .icon
        }
        color={
            statusIcons[status]
                .color
        }
        fill={
            [
                'initializing',
                'new'
            ].includes(status)
                ? theme.scales.blue.B9
                : undefined
        }
    /> : null
)

export default withTheme(ServerStatusIcon)
