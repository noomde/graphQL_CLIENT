import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { handleGithubLogin } from '../utils/handleGithubLogin.ts';
import toast from 'react-hot-toast';

import '../../../css/auth/auth.css';

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
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authShell">
      <form className="authCard" onSubmit={handleLogin}>
        <p className="authEyebrow">Welcome back</p>
        <h1 className="authTitle">Login</h1>
        {error && <p className="authError">{error}</p>}

        <label className="authField">
          Username
          <input
            className="authInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="authField">
          Password
          <input
            className="authInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="authActions">
          <button className="authPrimaryButton" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            className="authSecondaryButton"
            type="button"
            onClick={handleGithubLogin}
          >
            Login with GitHub
          </button>
        </div>

        {sessionExpired && (
          <p className="authError">
            Your session has expired. Please log in again.
          </p>
        )}
      </form>
    </main>
  );
}
