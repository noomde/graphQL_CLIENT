import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GamesFilter } from '../../types/inputType.ts';

import { useGames } from '../../hooks/useGame.ts';
import { useGameListControls } from '../../hooks/useGamesControls.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';
import { usePlatforms } from '../../../platforms/hooks/usePlatforms.ts';
import GameFiltersComponent from '../../../generic/components/helpers/gameFiltersComponent.tsx';
import PaginationComponent from '../../../generic/components/helpers/paginationControlsComponent.tsx';
import GameList from '../jsxElements/gamesList.tsx';

import '../../../../css/games/games.css';

/**
 * A component for rendering all games.
 *
 * @returns An element with all game data.
 */
export default function GamesComponent(): JSX.Element {
  const { platforms } = usePlatforms();
  const controls = useGameListControls();
  const navigate = useNavigate();

  const [filterDraft, setFilterDraft] = useState<GamesFilter>(controls.filter);

  const { games, loading, error } = useGames({
    page: controls.page,
    limit: controls.limit,
    filter: controls.normalizedFilter,
  });

  /**
   * Sets the filter state locally
   *
   * @param name - Name of the filter.
   * @param value - The filter value.
   */
  function handleFilterChange(name: keyof GamesFilter, value: string): void {
    setFilterDraft((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /**
   * Applies the filter globally.
   */
  function handleApplyFilters(): void {
    controls.applyFilters(filterDraft);
  }

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={games}>
      <div className="gamesPageShell">
        <aside className="gamesSidebar">
          <GameFiltersComponent
            filter={filterDraft}
            platforms={platforms}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            statsToggleLabel="Show more game stats"
            onStatsToggle={() =>
              navigate(
                `/nested-games?page=${controls.page}&limit=${controls.limit}&platform=${controls.filter.platform}&genre=${controls.filter.genre}&developer=${controls.filter.developer}&publisher=${controls.filter.publisher}`,
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
              <ul className="gamesGrid">
                {games.items.map((game) => (
                  <GameList key={game.id} game={game} />
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
