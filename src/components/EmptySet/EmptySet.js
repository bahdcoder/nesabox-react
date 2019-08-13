import React from 'react'
import { css } from 'glamor'
import { Pane, Heading, Button, Small, withTheme } from 'evergreen-ui'

const EmptySet = ({
    theme,
    handleAction,
    buttonLabel,
    heading,
    renderHeading,
    renderButton,
    description,
    renderDescription
}) => {
    return (
        <Pane
            width={'100%'}
            display="flex"
            padding="1rem"
            border="default"
            borderRadius={3}
            background="tint1"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            {heading && <Heading marginBottom={10}>{heading}</Heading>}

            {renderHeading && renderHeading()}

            {description && (
                <Small
                    className={css({
                        color: theme.colors.text.muted
                    })}
                >
                    {description}
                </Small>
            )}

            {renderDescription && renderDescription()}

            {buttonLabel && (
                <Button
                    marginTop={20}
                    intent="success"
                    appearance="primary"
                    onClick={handleAction}
                >
                    {buttonLabel}
                </Button>
            )}

            {renderButton && renderButton()}
        </Pane>
    )
}

export default withTheme(EmptySet)
