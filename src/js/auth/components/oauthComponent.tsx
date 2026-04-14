import { useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthLogin } from '../hooks/useOauth';
import { setToken } from '../utils/token';

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

        const response = await fetch(
          `http://localhost:3000/api/auth/github/callback?code=${code}`,
        );
        const user = await response.json();

        console.log('github user from server:', user);

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
