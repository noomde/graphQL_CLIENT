import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.tsx';

/**
 * Register component allows users to register using their credentials.
 *
 * @returns {JSX.Element} The registration form component.
 */
export default function RegisterComponent(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the form submission for registering the user from authContext.
   *
   * @param event - The submit event.
   */
  function handleRegister(event: React.SubmitEvent) {
    event.preventDefault();
    try {
      register({ username, password });
      navigate('home'); // TODO add the actual path
    } catch (error) {
      setError('Registration failed. Please check your credentials.');
      console.error('Registration error:', error);
    }
  }

  return (
    <form className="register-form fade-in" onSubmit={handleRegister}>
      <h1 className="register-title">Register</h1>
      {error && <p className="register-error">{error}</p>}

      <input
        className="register-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="register-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="register-button"
        type="submit"
        disabled={!username || !password}
      >
        Register
      </button>
    </form>
  );
}
