import React from 'react'
import Ace from 'react-ace'
import { css } from 'glamor'
import Section from 'components/Section'
import { withTheme, Button } from 'evergreen-ui'

const UpdateFile = ({
    fetchFile,
    setFile,
    file,
    working,
    theme,
    fileName,
    description,
    updateFile,
    aceMode
}) => {
    return (
        <Section title={fileName} description={description}>
            <div>
                {!file && (
                    <Button isLoading={working} onClick={fetchFile}>
                        Edit {fileName}
                    </Button>
                )}

                {file && (
                    <div
                        className={css({
                            padding: 16,
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            border: `1px solid ${theme.palette.neutral.light}`
                        })}
                    >
                        <Ace
                            width="100%"
                            mode={aceMode}
                            theme="tomorrow"
                            value={file}
                            showGutter={false}
                            showPrintMargin={false}
                            onChange={content => setFile(content)}
                            name="ghost-config-production-json"
                            editorProps={{
                                showGutter: false,
                                showLineNumbers: false
                            }}
                        />
                    </div>
                )}

                {file && (
                    <div
                        className={css({
                            width: '100%',
                            display: 'flex',
                            marginTop: 16,
                            justifyContent: 'flex-end'
                        })}
                    >
                        <Button
                            intent="danger"
                            marginRight={16}
                            onClick={() => setFile(null)}
                        >
                            Cancel
                        </Button>

                        <Button
                            intent="success"
                            isLoading={working}
                            appearance="primary"
                            onClick={updateFile}
                        >
                            Update {fileName}
                        </Button>
                    </div>
                )}
            </div>
        </Section>
    )
}

export default withTheme(UpdateFile)
