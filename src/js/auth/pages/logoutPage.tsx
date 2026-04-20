import LogoutComponent from '../components/logoutComponent.tsx';
import Header from '../../generic/components/header.tsx';
import { type JSX } from 'react';

/**
 * The logoutPage component serves as the main page for user logout.
 *
 * @returns {JSX.Element} The logout page component.
 */
export default function LogoutPage(): JSX.Element {
  return (
    <>
      <Header></Header>
      <LogoutComponent />;
    </>
  );
}
