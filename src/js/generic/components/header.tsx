import { type JSX } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth.ts';
import '../../../css/generic/header.css'

/**
 * The header component.
 *
 * @returns {JSX.Element}- The header as a component.
 */
export default function Header(): JSX.Element {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logoText">MetaStat</span>
        </Link>

        <div className="navLinks">
          <NavLink to="/games" className="navLink">
            Games
          </NavLink>

          <NavLink to="/platforms" className="navLink">
            Platforms
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className="navLink">
                Dashboard
              </NavLink>

              <NavLink to="/games/create" className="navLink">
                Create
              </NavLink>
            </>
          )}
        </div>

        <div className="authLinks">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="authLink">
                Login
              </NavLink>

              <NavLink to="/register" className="authButton">
                Register
              </NavLink>
            </>
          ) : (
            <NavLink to="/logout" className="authButton">
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
