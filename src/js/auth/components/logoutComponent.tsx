import { type JSX } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';

/**
 * Logout component, allows users to logout from their account.
 *
 * @returns {JSX.Element} The logout confirmation component.
 */
export default function LogoutComponent(): JSX.Element {
  const { logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the logout action by calling the logout function from authContext.
   */
  function handleLogout() {
    logout();
    navigate('/home');
  }

  return (
    <div className="logout-container">
      <h1 className="logout-title">Are you sure you want to logout?</h1>
      <div className="logout-buttons"></div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="cancel-button" onClick={() => navigate('home')}>
        Cancel
      </button>
    </div>
  );
}
