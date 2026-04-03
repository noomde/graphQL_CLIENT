import { type JSX } from 'react';
import { useNestedGames } from '../../hooks/useGame.ts';

/**
 * A component for rendering all games with their scores and platforms.
 *
 * @returns An element with all games, score and platform data.
 */
export default function NestedGamesComponent(): JSX.Element {
  const { games, loading, error } = useNestedGames();

  // TODO update to make more less repetetive
  if (loading) {
    return <p>Loading games...</p>;
  }

  if (error || !games) {
    return <p>Failed to load games, please try again</p>;
  }

  // TODO add the real rendering of data and the actual url for metacritic.
  return (
    <div>
      <h1>Games with score and platforms</h1>

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

            <p>
              Platforms:{' '}
              {game.platforms.map((platform) => platform.name).join(', ')}
            </p>

            <p>Metascore: {game.scores?.metascore}</p>
            <p>Metascore Count: {game.scores?.metascoreCount}</p>
            <p>Metascore Sentiment: {game.scores?.metascoreSentiment}</p>
            <p>UserScore: {game.scores?.userScore}</p>
            <p>UserScore Count: {game.scores?.userScoreCount}</p>
            <p>UserScore Sentiment: {game.scores?.userScoreSentiment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
