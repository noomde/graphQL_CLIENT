import { type JSX } from 'react';
import { useGame } from '../../hooks/useGame.ts';

/**
 * A component for rendering a game.
 *
 * @param id - The id of the game to render.
 * @returns An element with the game data.
 */
export default function GameComponent({ id }: { id: number }): JSX.Element {
  const { game, loading, error } = useGame(id);

  // TODO update to make more less repetetive
  if (loading) {
    return <p>Loading game...</p>;
  }

  if (error || !game) {
    return <p>Failed to load game, please try again</p>;
  }

  // TODO add the real rendering of data and the actual url for metacritic.
  return (
    <div>
      <h1>{game.title}</h1>

      <p>Release Date: {game.releaseDate}</p>
      <p>Rating: {game.rating}</p>
      <p>Genres: {game.genres}</p>
      <p>Description: {game.description}</p>
      <p>Developer: {game.developer}</p>
      <p>Publisher: {game.publisher}</p>
      <p>Metacritic url: {game.metacriticId}</p>
    </div>
  );
}
