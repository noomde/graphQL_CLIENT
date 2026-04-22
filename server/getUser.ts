import { type User } from './types.ts';

/**
 * Checks the user data to see if it is in the correct format.
 *
 * @param {object} data - The user data.
 * @returns {boolean} - True if the user data is correct, false otherwise.
 */
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    typeof data.id === 'number' &&
    'login' in data &&
    typeof data.login === 'string'
  );
}

/**
 * Exchanges github token for user.
 *
 * @param {string} accessToken - Github access token string.
 * @returns {Promise<User>} - The user if the response was successfull.
 */
export async function exchangeTokenForUser(accessToken: string): Promise<User> {
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  const user: unknown = await userResponse.json();

  if (!userResponse.ok) {
    throw new Error('GitHub rejected the user request');
  }

  if (!isUser(user)) {
    throw new Error('GitHub user response did not include a valid user');
  }

  return user;
}
