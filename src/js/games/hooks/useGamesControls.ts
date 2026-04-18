import { useState, type ChangeEvent } from 'react';
import type { GamesFilter } from '../types/inputType.ts';

const LIMIT_OPTIONS = [25, 50, 100] as const;

export type LimitOption = (typeof LIMIT_OPTIONS)[number];

/**
 * A custom hook for handling game list filters, pagination and limit changes.
 *
 * @param totalPages - The total number of available pages.
 * @returns The current filter, pagination state and related handlers.
 */
type UseGameListControlsReturn = {
  page: number;
  limit: LimitOption;
  filter: GamesFilter;
  normalizedFilter: GamesFilter;
  limitOptions: readonly LimitOption[];
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLimitChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handlePreviousPage: () => void;
  handleNextPage: (totalPages?: number) => void;
};

/**
 * A custom hook for handling game list filters, pagination and limit changes.
 *
 * @returns The current filter, pagination state and related handlers.
 */
export function useGameListControls(): UseGameListControlsReturn {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<LimitOption>(25);
  const [filter, setFilter] = useState<GamesFilter>({
    platform: '',
    genre: '',
    developer: '',
    publisher: '',
  });

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setPage(1);
    setFilter((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleLimitChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPage(1);
    setLimit(Number(event.target.value) as LimitOption);
  }

  function handlePreviousPage(): void {
    if (page > 1) {
      setPage((previous) => previous - 1);
    }
  }

  function handleNextPage(totalPages?: number): void {
    if (totalPages && page < totalPages) {
      setPage((previous) => previous + 1);
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
    handleFilterChange,
    handleLimitChange,
    handlePreviousPage,
    handleNextPage,
  };
}
