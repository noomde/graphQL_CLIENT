import { jwtDecode } from 'jwt-decode'
import type { DecodedUser } from '../types/authTypes'

const TOKEN_KEY = 'jwtToken'

/**
 * Retrieves the JWT token from local storage.
 *
 * @returns {string | null} The JWT token if it exists, otherwise null.
 */
export function getToken () {
    return localStorage.getItem(TOKEN_KEY)
} 

/**
 * Stores the JWT token in local storage.
 *
 * @param token - The JWT token to be stored.
 */
export function setToken (token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Removes the JWT token from local storage.
 */
export function removeToken () {
    localStorage.removeItem(TOKEN_KEY)
}

/**
 * Decodes the JWT token to extract user information.
 *
 * @param token - The JWT token to be decoded.
 * @returns The decoded user information.
 */
export function decodeToken (token: string) {
    return jwtDecode<DecodedUser>(token)
}

/**
 * Checks if the JWT token has expired by comparing the expiration time with the current time.
 *
 * @param token - The JWT token to be checked.
 * @returns True if the token has expired, otherwise false.
 */
export function isTokenExpired (token: string) {
    const decoded = decodeToken(token)
    return decoded.exp * 1000 < Date.now()
}