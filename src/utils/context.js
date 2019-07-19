/* eslint-disable react-hooks/exhaustive-deps */
import client from './axios'
import Loader from 'components/Loader'
import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

export const getDefaultAuth = () => {
    try {
        return JSON.parse(localStorage.getItem('auth'))
    } catch (e) {
        return null
    }
}

export const AuthProviderWrapper = ({ children }) => {
    const defaultAuth = getDefaultAuth()
    const [auth, setAuth] = useState(defaultAuth)
    const [checkingAuth, setCheckingAuth] = useState(defaultAuth ? true : false)

    useEffect(() => {
        defaultAuth &&
            client
                .get('/me')
                .then(({ data }) => {
                    setAuthAndCache(data)
                })
                .catch(() => {
                    setAuthAndCache(null)
                })
                .finally(() => {
                    setCheckingAuth(false)
                })
    }, [])

    const setAuthAndCache = (value = null) => {
        value
            ? localStorage.setItem('auth', JSON.stringify(value))
            : localStorage.removeItem('auth')

        setAuth(value)
    }

    return (
        <AuthProvider value={[auth, setAuthAndCache]}>
            {checkingAuth ? <Loader /> : children}
        </AuthProvider>
    )
}
