import React, { createContext, useEffect, useState, useRef } from 'react'
import Keycloak from 'keycloak-js'

interface KeycloakContextProps {
  keycloak: Keycloak | null
  authenticated: boolean
}

const KeycloakContext = createContext<KeycloakContextProps | undefined>(undefined)

interface KeycloakProviderProps {
  children: React.ReactNode
}

const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
  const isRun = useRef<boolean>(false)
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    if (isRun.current) return
    isRun.current = true

    const initKeycloak = async () => {
      // Hard-coded Keycloak configuration for production
      const keycloakConfig = {
        url: 'https://barbershop-app.duckdns.org/keycloak/',
        realm: 'barbershop',
        clientId: 'barbershop-front-end-client',
      }
      console.log('keycloakConfig', keycloakConfig)
      const keycloakInstance: Keycloak = new Keycloak(keycloakConfig)

      keycloakInstance
        .init({ onLoad: 'check-sso' })
        .then((auth: boolean) => {
          setAuthenticated(auth)
        })
        .catch((error) => {
          console.error('Keycloak initialization failed:', error)
          setAuthenticated(false)
        })
        .finally(() => {
          setKeycloak(keycloakInstance)
          console.log('keycloak', keycloakInstance)
        })
    }

    initKeycloak()
  }, [])

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  )
}

export { KeycloakProvider, KeycloakContext }
