import { type ChangeEvent, type JSX } from 'react';
import type { LimitOption } from '../../games/hooks/useGamesControls.ts';

type Props = {
  page: number;
  totalPages: number;
  limit: LimitOption;
  limitOptions: readonly LimitOption[];
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLimitChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

/**
 * A component for rendering pagination controls.
 *
 * @param page - The current page.
 * @param totalPages - The total number of pages.
 * @param limit - The current limit value.
 * @param limitOptions - The available limit options.
 * @param onPreviousPage - Goes to the previous page.
 * @param onNextPage - Goes to the next page.
 * @param onLimitChange - Handles limit changes.
 * @returns Pagination controls.
 */
export default function PaginationComponent({
  page,
  totalPages,
  limit,
  limitOptions,
  onPreviousPage,
  onNextPage,
  onLimitChange,
}: Props): JSX.Element {
  return (
    <div>
      <p>
        Page {page} of {totalPages}
      </p>

      <button onClick={onPreviousPage} disabled={page === 1}>
        Previous
      </button>

      <button onClick={onNextPage} disabled={page === totalPages}>
        Next
      </button>

      <div>
        <label htmlFor="limit">Games per page: </label>
        <select id="limit" value={limit} onChange={onLimitChange}>
          {limitOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}