import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGame } from '../../hooks/useGame.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';

import '../../../../css/games/games.css';

/**
 * A component for rendering a game.
 *
 * @param id - The id of the game to render.
 * @returns An element with the game data.
 */
export default function GameComponent({ id }: { id: number }): JSX.Element {
  const { game, loading, error } = useGame(id);
  const navigate = useNavigate();

  if (!game) {
    return (
      <LoadingOrErrorComponent loading={loading} error={error} data={game} />
    );
  }

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={game}>
      <article className="gameDetailCard">
        <div className="gameDetailHeader">
          <div>
            <p className="gameDetailEyebrow">Game #{game.id}</p>
            <h1 className="gameDetailTitle">{game.title}</h1>
          </div>

          <a
            className="gameLink"
            href={`https://www.metacritic.com/game/${game.metacriticId}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Metacritic
          </a>
        </div>

        <section className="gameInfoGrid">
          <p className="gameMeta">Release Date: {game.releaseDate}</p>
          <p className="gameMeta">Rating: {game.rating}</p>
          <p className="gameMeta">Genres: {game.genres}</p>
          <p className="gameMeta">Developer: {game.developer}</p>
          <p className="gameMeta">Publisher: {game.publisher}</p>
          <p className="gameMeta">Metacritic ID: {game.metacriticId}</p>
        </section>

        <p className="gameDescription gameDetailDescription">
          {game.description}
        </p>

        <div className="gameDetailActions">
          <button
            className="gameReadMore"
            onClick={() => navigate(`/games/update/:${game.id}`)}
          >
            Update game
          </button>

          <button
            className="gameDangerButton"
            onClick={() => navigate(`/games/delete/:${game.id}`)}
          >
            Delete game
          </button>
        </div>
      </article>
    </LoadingOrErrorComponent>
  );
}
