/**
 * Exhanges github OAuth code for an access token.
 *
 * @param {string} code - The authorization code from github.
 * @returns {Promise<object>} The token response from github.
 */
export async function exchangeCodeForToken(code: string) {
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

  const tokenData = await tokenResponse.json();

  return tokenData;
}
