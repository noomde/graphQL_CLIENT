import DeleteGameComponent from '../../components/mutation/deleteGameComponent';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This page is used to delete an existing game.
 *
 * @returns {JSX.Element} The DeleteGamePage component.
 */
export default function DeleteGamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return <DeleteGameComponent id={Number(id)} />;
}
