import UpdateGameComponent from '../../components/mutation/updateGameComponent';
import Header from '../../../generic/components/header';
import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This page is used to update an existing game.
 *
 * @returns {JSX.Element} The UpdateGamePage component.
 */
export default function UpdateGamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header></Header>
      <UpdateGameComponent id={Number(id)} />;
    </>
  );
}
