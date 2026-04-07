import DeleteGameComponent from '../../components/mutation/deleteGameComponent';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export default function DeleteGamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <DeleteGameComponent id={Number(id)} />;
}
