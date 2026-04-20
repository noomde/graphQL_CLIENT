import GameComponent from '../../components/query/gameComponent.tsx';
import Header from '../../../generic/components/header.tsx';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

/**
 * A page that displays the data of a single game.
 *
 * @returns {JSX.Element} The GamePage component.
 */
export default function GamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header></Header>
      <GameComponent id={Number(id)} />;
    </>
  );
}
