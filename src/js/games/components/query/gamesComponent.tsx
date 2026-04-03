import { type JSX } from 'react';
import { useGames } from '../../hooks/useGame.ts';

/**
 * A component for rendering all games.
 *
 * @returns An element with all game data.
 */
export default function GamesComponent(): JSX.Element {
  const { games, loading, error } = useGames();

  // TODO update to make less repetetive.
  if (loading) {
    return <p>Loading games...</p>;
  }

  if (error || !games) {
    return <p>Failed to load games, please try again</p>;
  }

  // TODO add the real rendering of data and the actual url for metacritic.
  return (
    <div>
      <h2>Games</h2>

      <ul>
        {games.items.map((game, index) => (
          <li key={index}>
            <h2>{game.title}</h2>

            <p>Release Date: {game.releaseDate}</p>
            <p>Rating: {game.rating}</p>
            <p>Genres: {game.genres}</p>
            <p>Description: {game.description}</p>
            <p>Developer: {game.developer}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Metacritic url: {game.metacriticId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
