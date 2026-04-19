import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { handleGithubLogin } from '../utils/handleGithubLogin.ts';

/**
 * Login component allows users to login using their credentials.
 *
 * @returns {JSX.Element} The login form component.
 */
export default function LoginComponent(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const sessionExpired = params.get('sessionExpired') === '1';

  /**
   * Handles the form submission for logging in the user from authContext.
   *
   * @param event - The submit event.
   */
  async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/home');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1 className="login-title">Login</h1>
      {error && <p className="login-error">{error}</p>}

      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <button type="button" onClick={handleGithubLogin}>
        Login with GitHub
      </button>

      {sessionExpired && (
        <p className="login-error">
          Your session has expired. Please log in again.
        </p>
      )}
    </form>
  );
}
