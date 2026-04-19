import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/utils/isAuthenticated.ts';

export default function Header() {
  const loggedIn = isAuthenticated();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/nested-games">Games</Link>
        <Link to="/platforms">Platforms</Link>

        {loggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/games/create">Create</Link>
          </>
        )}

        {!loggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Link to="/logout">Logout</Link>
        )}
      </nav>
    </header>
  );
}
