import Header from '../components/header.tsx';
import Home from '../components/home.tsx';
import { type JSX } from 'react';

/**
 * HomePage component serves as the landing page for the application.
 *
 * @returns {JSX.Element} The home page component.
 */
export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}
