/* eslint-disable react-hooks/exhaustive-deps */
import client from './axios'
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

    useEffect(() => {
        defaultAuth && client.get('/me').then(({ data }) => {
            setAuthAndCache(data)
        }).catch(() => {
            setAuthAndCache(null)
        })
    }, [])

    const setAuthAndCache = (value = null) => {
        if (value) {
            localStorage.setItem('auth', JSON.stringify(value))
        } else {
            localStorage.removeItem('auth')
        }


        setAuth(value)
    }

    return <AuthProvider value={[auth, setAuthAndCache]}>{children}</AuthProvider>
}
