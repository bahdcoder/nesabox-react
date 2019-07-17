import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

export const AuthProviderWrapper = ({ children }) => {
  const [auth, setAuth] = useState(null)

  return (
    <AuthProvider value={[auth, setAuth]}>
      {children}
    </AuthProvider>
  )
}
