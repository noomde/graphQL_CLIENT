import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNestedGames } from '../../hooks/useGame.ts';
import { useGameListControls } from '../../hooks/useGamesControls.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';
import { usePlatforms } from '../../../platforms/hooks/usePlatforms.ts';
import GameFiltersComponent from '../../../generic/components/helpers/gameFiltersComponent.tsx';
import PaginationComponent from '../../../generic/components/helpers/paginationControlsComponent.tsx';
import NestedGameList from '../jsxElements/nestedGamesList.tsx';

import '../../../../css/games/games.css'

/**
 * A component for rendering all games with their scores and platforms.
 *
 * @returns An element with all games, score and platform data.
 */
export default function NestedGamesComponent(): JSX.Element {
  const { platforms } = usePlatforms();
  const controls = useGameListControls();
  const navigate = useNavigate();

  const { games, loading, error } = useNestedGames({
    page: controls.page,
    limit: controls.limit,
    filter: controls.normalizedFilter,
  });

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={games}>
      <div className="gamesPageShell">
        <aside className="gamesSidebar">
          <GameFiltersComponent
            filter={controls.filter}
            platforms={platforms}
            onApplyFilters={controls.applyFilters}
            statsToggleLabel="Show less game stats"
            onStatsToggle={() =>
              navigate(
                `/games?page=${controls.page}&limit=${controls.limit}&platform=${controls.filter.platform}&genre=${controls.filter.genre}&developer=${controls.filter.developer}&publisher=${controls.filter.publisher}`,
              )
            }
          />

          {games && games.items.length > 0 && (
            <PaginationComponent
              page={controls.page}
              totalPages={games.totalPages}
              limit={controls.limit}
              limitOptions={controls.limitOptions}
              onPreviousPage={controls.handlePreviousPage}
              onNextPage={() => controls.handleNextPage(games.totalPages)}
              onLimitChange={controls.handleLimitChange}
            />
          )}
        </aside>

        <main className="gamesContent">
          {games && games.items.length > 0 ? (
            <>
            <ul className='gamesGrid'>
              {games.items.map((game) => (
                <NestedGameList key={game.id} game={game} />
              ))}
            </ul>
            </>
          ) : (
            <p>No games found</p>
          )}
        </main>
      </div>
    </LoadingOrErrorComponent>
  );
}
