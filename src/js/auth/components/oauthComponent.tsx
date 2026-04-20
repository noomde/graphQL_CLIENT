import { useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthLogin } from '../hooks/useOauth';
import { setToken } from '../utils/token';

type GithubUser = {
  id: number;
  login: string;
};

function isGithubUser(value: unknown): value is GithubUser {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'login' in value &&
    typeof value.login === 'string'
  );
}

async function readGithubUser(code: string): Promise<GithubUser> {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
  const callbackUrl = new URL('/api/auth/github/callback', apiBaseUrl);
  callbackUrl.searchParams.set('code', code);

  const response = await fetch(callbackUrl);
  const contentType = response.headers.get('content-type') ?? '';

  if (!response.ok) {
    throw new Error(`GitHub callback failed with status ${response.status}`);
  }

  if (!contentType.includes('application/json')) {
    const bodyPreview = (await response.text()).slice(0, 120);
    throw new Error(`GitHub callback returned ${contentType || 'unknown content type'}: ${bodyPreview}`);
  }

  const user: unknown = await response.json();

  if (!isGithubUser(user)) {
    throw new Error('GitHub callback did not return a valid user');
  }

  return user;
}

/**
 * Oauth callback component. Allows the user to login through github. The Github user info is sent to the graphql api.
 *
 * @returns {JSX.Element} - The oauth loggin in paragraph.
 */
export default function OauthCallbackComponent(): JSX.Element {
  const navigate = useNavigate();
  const { oauthLogin } = useOAuthLogin();

  useEffect(() => {
    async function runCallback() {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const returnedState = params.get('state');
        const savedState = sessionStorage.getItem('github_oauth_state');

        if (!code || !returnedState || returnedState !== savedState) {
          navigate('/login');
          throw new Error('Invalid OAuth state');
        }

        const user = await readGithubUser(code);

        const payload = await oauthLogin({
          provider: 'github',
          providerId: String(user.id),
          username: user.login,
        });

        if (!payload?.token) {
          navigate('/login');
          return;
        }

        setToken(payload.token);
        window.location.href = '/';
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    }

    runCallback();
  }, [navigate, oauthLogin]);

  return <p>Loggin in... </p>;
}
