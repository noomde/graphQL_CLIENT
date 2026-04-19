import RegisterComponent from '../components/registerComponent.tsx';
import Header from '../../generic/components/header.tsx';
import { type JSX } from 'react';

/**
 * The RegisterPage component serves as the main page for user registration.
 *
 * @returns {JSX.Element} The registration page component.
 */
export default function RegisterPage(): JSX.Element {
  return (
    <>
      <Header></Header>
      <RegisterComponent />;
    </>
  );
}
