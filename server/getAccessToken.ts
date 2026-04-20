import type { TokenResponse } from './types.ts';

function isTokenResponse(data: unknown): data is TokenResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    typeof data.access_token === 'string'
  );
}

/**
 * Exhanges github OAuth code for an access token.
 *
 * @param {string} code - The authorization code from github.
 * @returns {Promise<string>} The token response from github.
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const tokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    },
  );

  const tokenData: unknown = await tokenResponse.json();

  if (!isTokenResponse(tokenData)) {
    throw new Error('GitHub token response did not include an access token');
  }

  return tokenData.access_token;
}
