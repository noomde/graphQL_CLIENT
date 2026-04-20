import { type ChangeEvent, type JSX } from 'react';
import type { LimitOption } from '../../../games/hooks/useGamesControls.ts';

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
    <section className="gamePaginationPanel">
      <p className="pageStatus">
        Page {page} of {totalPages}
      </p>

      <div className="pageActions">
        <button
          className="pageButton"
          onClick={onPreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          className="pageButton"
          onClick={onNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <div className="pageLimit">
        <label htmlFor="limit">Games per page: </label>
        <select
          className="pageSelect"
          id="limit"
          value={limit}
          onChange={onLimitChange}
        >
          {limitOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
