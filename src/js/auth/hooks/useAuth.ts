import { createContext, useContext } from 'react';
import type { AuthContextType } from '../types/authTypes.ts';

export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Hook for accessing the auth context.
 *
 * @returns - The current auth context (user, auth state and actions).
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
