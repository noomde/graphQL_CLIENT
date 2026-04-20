import PlatformsComponent from '../components/platformsComponent';
import Header from '../../generic/components/header';
import { type JSX } from 'react';

/**
 * PlatformPage component serves as the page for all of the platforms.
 *
 * @returns {JSX.Element} The platform page component.
 */
export default function PlatformPage(): JSX.Element {
  return (
    <>
      <Header></Header>
      <PlatformsComponent />;
    </>
  );
}
