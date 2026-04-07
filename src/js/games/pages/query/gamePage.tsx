import GameComponent from '../../components/query/gameComponent.tsx';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export default function GamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <GameComponent id={Number(id)} />;
}
