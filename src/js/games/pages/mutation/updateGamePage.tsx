import UpdateGameComponent from '../../components/mutation/updateGameComponent';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateGamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <UpdateGameComponent id={Number(id)} />;
}
