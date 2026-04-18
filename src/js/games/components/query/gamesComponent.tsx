import { useState, type ChangeEvent, type JSX } from 'react';
import { useGames } from '../../hooks/useGame.ts';
import type { GamesFilter } from '../../types/inputType.ts';
import LoadingOrErrorComponent from '../../../generic/components/loadingOrErrorComponent.tsx';

const LIMIT_OPTIONS = [25, 50, 100] as const;

/**
 * A component for rendering all games.
 *
 * @returns An element with all game data.
 */
export default function GamesComponent(): JSX.Element {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<(typeof LIMIT_OPTIONS)[number]>(25);
  const [filter, setFilter] = useState<GamesFilter>({
    platform: '',
    genre: '',
    developer: '',
    publisher: '',
  });

  const { games, loading, error } = useGames({
    page,
    limit,
    filter: {
      platform: filter.platform || undefined,
      genre: filter.genre || undefined,
      developer: filter.developer || undefined,
      publisher: filter.publisher || undefined,
    },
  });

  /**
   * Handles filter field changes and resets page to 1.
   *
   * @param event - The input change event.
   */
  function handleFilterChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setPage(1);
    setFilter((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /**
   * Handles limit changes and resets page to 1.
   *
   * @param event - The select change event.
   */
  function handleLimitChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPage(1);
    setLimit(Number(event.target.value) as (typeof LIMIT_OPTIONS)[number]);
  }

  /**
   * Goes to the previous page.
   */
  function handlePreviousPage(): void {
    if (page > 1) {
      setPage((previous) => previous - 1);
    }
  }

  /**
   * Goes to the next page.
   */
  function handleNextPage(): void {
    if (games && page < games.totalPages) {
      setPage((previous) => previous + 1);
    }
  }

  if (!games) {
    return (
      <LoadingOrErrorComponent loading={loading} error={error} data={games} />
    );
  }

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={games}>
      <div>
        <h2>Games</h2>

        <div>
          <h3>Filters</h3>

          <input
            type="text"
            name="platform"
            placeholder="Filter by platform"
            value={filter.platform ?? ''}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="genre"
            placeholder="Filter by genre"
            value={filter.genre ?? ''}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="developer"
            placeholder="Filter by developer"
            value={filter.developer ?? ''}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="publisher"
            placeholder="Filter by publisher"
            value={filter.publisher ?? ''}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label htmlFor="limit">Games per page: </label>
          <select id="limit" value={limit} onChange={handleLimitChange}>
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <ul>
          {games.items.map((game) => (
            <li key={game.id}>
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
      <p>
        Page {games.page} of {games.totalPages}
      </p>

      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>

      <button onClick={handleNextPage} disabled={page === games.totalPages}>
        Next
      </button>
    </LoadingOrErrorComponent>
  );
}
