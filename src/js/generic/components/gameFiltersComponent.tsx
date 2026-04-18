import { type ChangeEvent, type JSX } from 'react';
import type { GamesFilter } from '../../games/types/inputType';

type PlatformOption = {
  name: string;
};

type Props = {
  filter: GamesFilter;
  platforms: PlatformOption[];
  onFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A component for rendering game filters.
 *
 * @param filter - The current filter values.
 * @param platforms - Available platform options.
 * @param onFilterChange - Handles filter input changes.
 * @returns The filter inputs.
 */
export default function GameFiltersComponent({
  filter,
  platforms,
  onFilterChange,
}: Props): JSX.Element {
  return (
    <div>
      <h3>Filters</h3>

      <input
        type="text"
        name="platform"
        list="platform-options"
        placeholder="Filter by platform"
        value={filter.platform ?? ''}
        onChange={onFilterChange}
      />

      <datalist id="platform-options">
        {platforms.map((platform) => (
          <option key={platform.name} value={platform.name} />
        ))}
      </datalist>

      <input
        type="text"
        name="genre"
        placeholder="Filter by genre"
        value={filter.genre ?? ''}
        onChange={onFilterChange}
      />

      <input
        type="text"
        name="developer"
        placeholder="Filter by developer"
        value={filter.developer ?? ''}
        onChange={onFilterChange}
      />

      <input
        type="text"
        name="publisher"
        placeholder="Filter by publisher"
        value={filter.publisher ?? ''}
        onChange={onFilterChange}
      />
    </div>
  );
}