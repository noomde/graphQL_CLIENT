import { type JSX } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import '../../../css/auth/auth.css';

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
    toast.success('Logged out successfully');
    navigate('/');
  }

  return (
    <main className="authShell">
      <section className="authCard authLogoutCard">
        <p className="authEyebrow">Logout</p>
        <h1 className="authTitle">Are you sure you want to logout?</h1>

        <div className="authActions">
          <button className="authDangerButton" onClick={handleLogout}>
            Logout
          </button>
          <button className="authSecondaryButton" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </section>
    </main>
  );
}
