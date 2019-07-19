import React from 'react'
import { SegmentedControl } from 'evergreen-ui'

const ServerProvidersForm = ({ providers, form, setValue }) => {
    return (
        <SegmentedControl
            width={'100%'}
            marginBottom={20}
            options={providers}
            value={form.provider}
            onChange={provider => setValue('provider', provider)}
        />
    )
}

export default ServerProvidersForm
