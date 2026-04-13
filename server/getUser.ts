import { type User } from './types.ts';

/**
 * Exchanges github token for user.
 *
 * @param {string} accessToken - Github access token string.
 * @returns {Promise<User>}
 */
export async function exchangeTokenForUser(accessToken: string): Promise<User> {
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  const user = await userResponse.json();

  return user;
}
