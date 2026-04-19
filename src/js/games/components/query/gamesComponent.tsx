import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGames } from '../../hooks/useGame.ts';
import { useGameListControls } from '../../hooks/useGamesControls.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';
import { usePlatforms } from '../../../platforms/hooks/usePlatforms.ts';
import GameFiltersComponent from '../../../generic/components/helpers/gameFiltersComponent.tsx';
import PaginationComponent from '../../../generic/components/helpers/paginationControlsComponent.tsx';

/**
 * A component for rendering all games.
 *
 * @returns An element with all game data.
 */
export default function GamesComponent(): JSX.Element {
  const { platforms } = usePlatforms();
  const controls = useGameListControls();
  const navigate = useNavigate();

  const { games, loading, error } = useGames({
    page: controls.page,
    limit: controls.limit,
    filter: controls.normalizedFilter,
  });

  if (!games) {
    return (
      <LoadingOrErrorComponent loading={loading} error={error} data={games} />
    );
  }

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={games}>
      <div>
        <h2>Games</h2>

        <GameFiltersComponent
          filter={controls.filter}
          platforms={platforms}
          onApplyFilters={controls.applyFilters}
        />

        <PaginationComponent
          page={controls.page}
          totalPages={games.totalPages}
          limit={controls.limit}
          limitOptions={controls.limitOptions}
          onPreviousPage={controls.handlePreviousPage}
          onNextPage={() => controls.handleNextPage(games.totalPages)}
          onLimitChange={controls.handleLimitChange}
        />

        <ul>
          {games.items.map((game) => (
            <li
              key={game.id}
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
          ))}
        </ul>
      </div>
    </LoadingOrErrorComponent>
  );
}
