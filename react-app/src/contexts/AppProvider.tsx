import { type ReactNode } from 'react'
import { CartProvider } from './CartContext'

interface AppProviderProps {
  children: ReactNode
}

/**
 * Root provider — wraps the app with all shared contexts.
 * Add new providers here as they are introduced; order matters for
 * providers that depend on each other (outer = available to inner).
 */
export function AppProvider({ children }: AppProviderProps) {
  return <CartProvider>{children}</CartProvider>
}
