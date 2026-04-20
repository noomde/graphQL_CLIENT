import { getToken, isTokenExpired, removeToken } from "./token.ts";

/**
 * Checks if the user is authenticated.
 *
 * @returns True if there is a valid non-expired token, otherwise false.
 */
export function isAuthenticated(): boolean {
  const token = getToken();

  if (!token) {
    return false;
  }

  try {
    return !isTokenExpired(token);
  } catch {
    removeToken();
    return false;
  }
}