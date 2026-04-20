import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { type NestedGame } from '../../types/responseType.ts';

type Props = {
  game: NestedGame;
};

/**
 * The nested game list as an Element.
 *
 * @param game - A single game from all nested games.
 * @returns -The nested game list.
 */
export default function NestedGameListItem({ game }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <li
      key={game.id}
      onClick={() => navigate(`/nested-games/${game.id}`)}
      style={{ cursor: 'pointer' }}
    >
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
    </li>
  );
}
