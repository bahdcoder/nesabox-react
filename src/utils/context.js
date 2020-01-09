/* eslint-disable react-hooks/exhaustive-deps */
import client from './axios'
import Echo from 'laravel-echo'
import Io from 'socket.io-client'
import { toaster } from 'evergreen-ui'
import Loader from 'components/Loader'
import React, { createContext, useState, useEffect } from 'react'

window.io = Io

export const AuthContext = createContext()
export const WebsocketContext = createContext()

export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

export const WebsocketProvider = WebsocketContext.Provider
export const WebsocketConsumer = WebsocketContext.Consumer

export const getDefaultAuth = () => {
    try {
        return JSON.parse(localStorage.getItem('auth'))
    } catch (e) {
        return null
    }
}

export const WebsocketProviderWrapper = ({ children, auth }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        auth &&
            setSocket(
                new Echo({
                    broadcaster: 'socket.io',
                    host: process.env.REACT_APP_API_URL + ':6001',
                    auth: {
                        headers: {
                            Authorization: `Bearer ${auth.access_token}`
                        }
                    }
                }).private(`App.User.${auth.id}`)
            )

        return () => socket && socket.unsubscribe()
    }, [auth])

    if (!auth) return <React.Fragment>{children}</React.Fragment>

    return (
        <WebsocketProvider value={[socket]}>
            {socket ? children : <Loader />}
        </WebsocketProvider>
    )
}

export const AuthProviderWrapper = ({ children }) => {
    const defaultAuth = getDefaultAuth()
    const [auth, setAuth] = useState(defaultAuth)
    const [checkingAuth, setCheckingAuth] = useState(defaultAuth ? true : false)

    const setLogout = callback => {
        setCheckingAuth(true)

        client.delete('logout').finally(() => {
            setAuthAndCache(null)
            setCheckingAuth(false)
            callback()
        })
    }

    useEffect(() => {
        defaultAuth &&
            client
                .get('/me')
                .then(({ data }) => {
                    /**
                     * When caching user auth token, we'll maintain the access token
                     * since it won't come in all requests.
                     *
                     */

                    setAuthAndCache(data)
                })
                .catch(() => {
                    toaster.danger('Session expired. Please login again.')

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
        <AuthProvider value={[auth, setAuthAndCache, setLogout]}>
            {checkingAuth ? <Loader /> : children}
        </AuthProvider>
    )
}