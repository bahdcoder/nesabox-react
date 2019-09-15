import { css } from 'glamor'
import React, { useEffect } from 'react'
import { withTheme } from 'evergreen-ui'
import GithubTheme from 'utils/github-theme'
import Highlight, { defaultProps } from 'prism-react-renderer'

const Logs = ({ theme, logs, id = 'logs' }) => {
    const editorStyles = css({
        width: '100%',
        overflow: 'scroll',
        maxHeight: '450px',
        boxSizing: 'border-box',
        fontFamily: 'Inconsolata',
        border: `2px solid ${theme.palette.neutral.light}`
    })

    useEffect(() => {
        const logsContainer = document.getElementById(id)

        if (logsContainer) logsContainer.scrollTop = logsContainer.scrollHeight
    }, [id, logs])

    if (!logs) return null

    return (
        <div id={id} className={editorStyles}>
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
