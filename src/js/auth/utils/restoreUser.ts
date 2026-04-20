import { getToken, isTokenExpired, removeToken, decodeToken } from './token.ts';
import type { DecodedUser } from '../types/authTypes.ts';

/**
 * Restores the user information from the JWT token stored in local storage.
 *
 * @returns The decoded user information if the token is valid and not expired, otherwise null.
 */
export function restoreUser(): DecodedUser | null {
  const token = getToken();

  if (!token) {
    return null;
  }

  if (isTokenExpired(token)) {
    removeToken();
    return null;
  }

  return decodeToken(token);
}
