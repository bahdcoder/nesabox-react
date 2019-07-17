import { css } from 'glamor'
import React, { useContext } from 'react'
import { ThemeContext } from 'evergreen-ui'

const Topbar = () => {
  const { palette } = useContext(ThemeContext)

  return (
    <div className={css({
      width: '100%',
      height: '0.25rem',
      backgroundColor: palette.green.base
    })} ></div>
  )
}

export default Topbar
