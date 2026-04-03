import { type JSX } from 'react';
import { useNestedGame } from '../../hooks/useGame.ts';

/**
 * A component for rendering a game with nested data (score and platforms).
 *
 * @param id - the id of the game.
 * @returns An element with the game, score and platform data for a specific game.
 */
export default function NestedGameComponent({
  id,
}: {
  id: number;
}): JSX.Element {
  const { game, loading, error } = useNestedGame(id);

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
      <h2>{game.title}</h2>

      <p>Release Date: {game.releaseDate}</p>
      <p>Rating: {game.rating}</p>
      <p>Genres: {game.genres}</p>
      <p>Description: {game.description}</p>
      <p>Developer: {game.developer}</p>
      <p>Publisher: {game.publisher}</p>
      <p>Metacritic url: {game.metacriticId}</p>

      <p>
        Platforms: {game.platforms.map((platform) => platform.name).join(', ')}
      </p>

      <p>Metascore: {game.scores?.metascore}</p>
      <p>Metascore Count: {game.scores?.metascoreCount}</p>
      <p>Metascore Sentiment: {game.scores?.metascoreSentiment}</p>
      <p>UserScore: {game.scores?.userScore}</p>
      <p>UserScore Count: {game.scores?.userScoreCount}</p>
      <p>UserScore Sentiment: {game.scores?.userScoreSentiment}</p>
    </div>
  );
}
