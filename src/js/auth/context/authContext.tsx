import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useApolloClient } from '@apollo/client/react';
import { restoreUser } from '../utils/restoreUser.ts';
import type {
  DecodedUser,
  AuthContextType,
  AuthCredentials,
} from '../types/authTypes.ts';
import {
  loginAction,
  registerAction,
  logoutAction,
} from '../services/authActions.ts';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const client = useApolloClient();

  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Logs in the user by calling the login action with the provided credentials and updating the user state.
   *
   * @param credentials - The user's login credentials (username and password).
   * @returns A promise that resolves when the login action is complete.
   */
  function login(credentials: AuthCredentials) {
    return loginAction(client, credentials, setUser);
  }

  /**
   * Registers a new user by calling the register action with the provided credentials.
   *
   * @param credentials - The user's registration credentials (username, email, and password).
   * @returns A promise that resolves when the registration action is complete.
   */
  function register(credentials: AuthCredentials) {
    return registerAction(client, credentials);
  }

  /**
   * Logs out the user by calling the logout action and updating the user state.
   *
   * @returns A promise that resolves when the logout action is complete.
   */
  function logout() {
    return logoutAction(setUser);
  }

  useEffect(() => {
    setUser(restoreUser());
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
