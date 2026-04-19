import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGame } from '../../hooks/useGame.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';

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
      <div>
        <h1>{game.title}</h1>

        <p>Release Date: {game.releaseDate}</p>
        <p>Rating: {game.rating}</p>
        <p>Genres: {game.genres}</p>
        <p>Description: {game.description}</p>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Metacritic url: {game.metacriticId}</p>

        <button onClick={() => navigate(`/games/update/:${game.id}`)}>
          UPDATE GAME
        </button>

        <button onClick={() => navigate(`/games/delete/:${game.id}`)}>
          DELETE GAME
        </button>
      </div>
    </LoadingOrErrorComponent>
  );
}
