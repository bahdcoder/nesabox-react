import React from 'react'
import { css } from 'glamor'
import { withTheme } from 'evergreen-ui'
import GithubTheme from 'utils/github-theme'
import Highlight, { defaultProps } from 'prism-react-renderer'

const Logs = ({ theme, logs, id }) => {
    const editorStyles = css({
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `2px solid ${theme.palette.neutral.light}`
    })

    if (!logs) return null

    return (
        <div id={id || 'logs'} className={editorStyles}>
            <Highlight
                code={logs}
                language="bash"
                {...defaultProps}
                theme={GithubTheme}
            >
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps
                }) => (
                    <React.Fragment>
                        <pre
                            className={className}
                            style={{
                                ...style,
                                margin: '0px',
                                fontSize: '13px',
                                padding: '0.7rem',
                                overflow: 'scroll',
                                fontFamily: 'Inconsolata'
                            }}
                        >
                            {tokens.map((line, i) => (
                                <div
                                    {...getLineProps({
                                        line,
                                        key: i
                                    })}
                                >
                                    {line.map((token, key) => (
                                        <span
                                            {...getTokenProps({
                                                token,
                                                key
                                            })}
                                        />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    </React.Fragment>
                )}
            </Highlight>
        </div>
    )
}

export default withTheme(Logs)
