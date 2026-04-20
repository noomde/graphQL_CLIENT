import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Game } from '../../types/responseType';

type Props = {
    game: Game
}

/**
 * The game list as an Element.
 *
 * @param game - A single game from all games.
 * @returns -The game list.
 */
export default function GameList({ game }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/games/${game.id}`)}
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
    </li>
  );
}