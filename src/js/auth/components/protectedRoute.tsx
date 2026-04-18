import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/isAuthenticated.ts';

/**
 * protects routes from being used if the user is not logged in.
 *
 * @returns The wanted page if not navigates to login page.
 */
export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}