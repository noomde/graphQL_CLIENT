import { type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { GamesFilter } from '../types/inputType.ts';

const LIMIT_OPTIONS = [25, 50, 100] as const;
export type LimitOption = (typeof LIMIT_OPTIONS)[number];

/**
 * Return type for the hook.
 */
type UseGameListControlsReturn = {
  page: number;
  limit: LimitOption;
  filter: GamesFilter;
  normalizedFilter: GamesFilter;
  limitOptions: readonly LimitOption[];
  handleLimitChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handlePreviousPage: () => void;
  handleNextPage: (totalPages?: number) => void;
  applyFilters: (newFilter: GamesFilter) => void;
};

/**
 * A custom hook for handling game list filters, pagination and limit changes.
 *
 * @returns The current filter, pagination state and related handlers.
 */
export function useGameListControls(): UseGameListControlsReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get('page') || '1');
  const page = rawPage > 0 ? rawPage : 1;

  const rawLimit = Number(searchParams.get('limit') || '25') as LimitOption;
  const limit = LIMIT_OPTIONS.includes(rawLimit) ? rawLimit : 25;

  const filter: GamesFilter = {
    platform: searchParams.get('platform') || '',
    genre: searchParams.get('genre') || '',
    developer: searchParams.get('developer') || '',
    publisher: searchParams.get('publisher') || '',
  };

  /**
   * Core helper function for updating URL params.
   *
   * - Keeps existing params
   * - Updates only the provided fields
   * - Removes empty values from URL
   */
  function updateParams(updates: Record<string, string | number | undefined>) {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, String(value));
    });

    setSearchParams(nextParams);
  }

  /**
   * Applies all draft filters to the URL.
   */
  function applyFilters(newFilter: GamesFilter): void {
    updateParams({
      platform: newFilter.platform,
      genre: newFilter.genre,
      developer: newFilter.developer,
      publisher: newFilter.publisher,
      page: 1,
    });
  }

  /**
   * Updates limit.
   */
  function handleLimitChange(event: ChangeEvent<HTMLSelectElement>): void {
    updateParams({
      limit: Number(event.target.value),
      page: 1,
    });
  }

  /**
   * Moves to previous page.
   */
  function handlePreviousPage(): void {
    if (page > 1) {
      updateParams({
        page: page - 1,
      });
    }
  }

  /**
   * Moves to next page.
   */
  function handleNextPage(totalPages?: number): void {
    if (totalPages && page < totalPages) {
      updateParams({
        page: page + 1,
      });
    }
  }

  const normalizedFilter: GamesFilter = {
    platform: filter.platform || undefined,
    genre: filter.genre || undefined,
    developer: filter.developer || undefined,
    publisher: filter.publisher || undefined,
  };

  return {
    page,
    limit,
    filter,
    normalizedFilter,
    limitOptions: LIMIT_OPTIONS,
    handleLimitChange,
    handlePreviousPage,
    handleNextPage,
    applyFilters,
  };
}
