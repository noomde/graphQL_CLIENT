import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Game } from '../../types/responseType';

import '../../../../css/games/games.css';

type Props = {
  game: Game;
};

/**
 * The game list as an Element.
 *
 * @param game - A single game from all games.
 * @returns -The game list.
 */
export default function GameList({ game }: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <li className="gameCard">
      <h2 className="gameTitle">{game.title}</h2>

      <p className="gameMeta">Release Date: {game.releaseDate}</p>
      <p className="gameMeta">Rating: {game.rating}</p>
      <p className="gameMeta">Genres: {game.genres}</p>
      <p className="gameMeta">Developer: {game.developer}</p>
      <p className="gameMeta">Publisher: {game.publisher}</p>

      <div className="gameFooter">
        <div className="gameActions">
          <button
            className="gameReadMore"
            onClick={() => navigate(`/games/${game.id}`)}
          >
            Read more
          </button>

          <a
            className="gameLink"
            href={`https://www.metacritic.com/game/${game.metacriticId}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Metacritic
          </a>
        </div>

        <p className="gameNumber">#{game.id}</p>
      </div>
    </li>
  );
}
