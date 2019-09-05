import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import { withTheme } from 'evergreen-ui'

const SegmentedControl = ({ options = [], selected, handleClick, theme }) => {
    return (
        <div
            className={css({
                display: 'flex'
            })}
        >
            {options.map(option => (
                <div
                    key={option.icon}
                    onClick={() => handleClick(option)}
                    className={css(
                        {
                            display: 'flex',
                            marginRight: 16,
                            cursor: 'pointer',
                            maxWidth: '200px',
                            borderRadius: '4px',
                            padding: `8px 16px`,
                            alignItems: 'center',
                            border: `1px solid ${theme.palette.neutral.light}`
                        },
                        (selected || options[0]).name === option.name && {
                            border: `2px solid ${theme.palette.green.base}`
                        }
                    )}
                >
                    <div
                        className={css({
                            marginRight: 8
                        })}
                    >
                        <Svg width={24} height={24} icon={option.icon} />
                    </div>
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        })}
                    >
                        <span>{option.title}</span>
                        <small
                            className={css({
                                marginTop: 8
                            })}
                        >
                            {option.description}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default withTheme(SegmentedControl)
