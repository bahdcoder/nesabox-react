import React from 'react'
import { css } from 'glamor'
import Svg from 'components/Svg'
import { Spinner } from 'evergreen-ui'

const GithubButton = ({ submitting, redirectToProvider, label }) => {
    return (
        <button
            disabled={submitting}
            onClick={redirectToProvider}
            className={css(
                {
                    width: '100%',
                    display: 'flex',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    paddingTop: '0.7rem',
                    marginBottom: '1.5rem',
                    paddingBottom: '0.7rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                },
                submitting && {
                    background: '#fafafa',
                    cursor: 'not-allowed',
                    color: '#24292e'
                },
                !submitting && {
                    background: '#24292e',
                    ':hover': {
                        background: '#606f7b'
                    },
                    color: '#fff'
                }
            )}
        >
            {!submitting && (
                <Svg
                    icon="github_light"
                    className={css({
                        marginRight: '1rem'
                    })}
                    width={'1rem'}
                    height={'1rem'}
                />
            )}
            {submitting && <Spinner marginRight={8} size={16} />}
            {label} with Github
        </button>
    )
}

export default GithubButton
