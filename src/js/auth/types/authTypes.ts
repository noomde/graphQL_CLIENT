/**
 * Decoded user information extracted from the JWT token
 */
export type DecodedUser = {
  username?: string;
  sub?: string;
  exp: number;
};

/**
 * Credentials required for authentication
 */
export type AuthCredentials = {
  username: string;
  password: string;
};

/**
 * Context type for authentication, providing user information and authentication methods
 */
export type AuthContextType = {
  isAuthenticated: boolean;
  user: DecodedUser | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
};
