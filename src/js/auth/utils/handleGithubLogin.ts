/**
 * Works as a start for the OAuth sequence. By sending the initial link to the oauth app.
 */
export function handleGithubLogin() {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const state = crypto.randomUUID();
  sessionStorage.setItem('github_oauth_state', state)

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=read:user` +
    `&state=${encodeURIComponent(state)}`

  window.location.href = url;
}
