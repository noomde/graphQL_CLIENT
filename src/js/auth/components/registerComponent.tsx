import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import toast from 'react-hot-toast';

import '../../../css/auth/auth.css';

/**
 * Register component allows users to register using their credentials.
 *
 * @returns {JSX.Element} The registration form component.
 */
export default function RegisterComponent(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the form submission for registering the user from authContext.
   *
   * @param event - The submit event.
   */
  async function handleRegister(event: React.SubmitEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await register({ username, password });

      toast.success('Registered successfully');
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please check your credentials.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authShell">
      <form className="authCard" onSubmit={handleRegister}>
        <p className="authEyebrow">Create account</p>
        <h1 className="authTitle">Register</h1>
        {error && <p className="authError">{error}</p>}

        <label className="authField">
          Username
          <input
            className="authInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>

        <label className="authField">
          Password
          <input
            className="authInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>

        <div className="authActions">
          <button
            className="authPrimaryButton"
            type="submit"
            disabled={!username || !password || loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </main>
  );
}
