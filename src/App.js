import 'normalize.css'
import Routes from 'components/Routes'
import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProviderWrapper } from 'utils/context'
import { ThemeProvider, ThemeContext } from 'evergreen-ui'

const App = () => {
    const theme = useContext(ThemeContext)

    return (
        <AuthProviderWrapper>
            <ThemeProvider
                value={{
                    ...theme,
                    colors: {
                        ...theme.colors,
                        background: {
                            ...theme.colors.background,
                            white: '#fff'
                        }
                    },
                    getFontFamily: () => 'ProximaNova'
                }}
            >
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </AuthProviderWrapper>
    )
}

export default App
