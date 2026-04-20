import CreateGameComponent from '../../components/mutation/createGameComponent.tsx';
import Header from '../../../generic/components/header.tsx';
import { type JSX } from 'react';

/**
 * This page is used to create a new game.
 *
 * @returns {JSX.Element} The CreateGamePage component.
 */
export default function CreateGamePage(): JSX.Element {
  return (
    <>
      <Header></Header>
      <CreateGameComponent />;
    </>
  );
}
