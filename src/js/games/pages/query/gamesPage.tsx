import GamesComponent from '../../components/query/gamesComponent.tsx';
import Header from '../../../generic/components/header.tsx';
import { type JSX } from 'react';

/**
 * A page that displays the data of all games.
 *
 * @returns {JSX.Element} The games page component.
 */
export default function GamesPage(): JSX.Element {
  return (
    <>
      <Header></Header>
      <GamesComponent  />;
    </>
  );
}
