import React from 'react'
import { css } from 'glamor'
import styles from './Section.css'
import Heading from 'components/Heading'
import { Text, withTheme } from 'evergreen-ui'

const Section = ({
    title,
    description,
    children,
    theme,
    titleWidth = '35%',
    contentWidth = '65%'
}) => {
    return (
        <div
            className={css({
                ...styles.container,
                borderBottom: `1px solid ${theme.palette.neutral.light}`
            })}
        >
            <div
                className={css([
                    styles.title,
                    {
                        width: titleWidth
                    }
                ])}
            >
                <Heading
                    marginBottom={16}
                    textTransform="capitalize"
                    color={theme.palette.neutral.dark}
                >
                    {title}
                </Heading>
                <Text color={theme.colors.text.dark}>{description}</Text>
            </div>

            <div
                className={css([
                    styles.content,
                    {
                        width: contentWidth
                    }
                ])}
            >
                {children}
            </div>
        </div>
    )
}

export default withTheme(Section)
