import React from 'react'
import Section from 'components/Section'

const SiteSettings = () => {
    return (
        <React.Fragment>
            <Section
                title="Environment variables"
                description="These variables would be set on your app's environment before every deployment."
            ></Section>
        </React.Fragment>
    )
}

export default SiteSettings
