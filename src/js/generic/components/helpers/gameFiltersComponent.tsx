import {
  type ChangeEvent,
  type KeyboardEvent,
  type JSX,
} from 'react';
import type { GamesFilter } from '../../../games/types/inputType';

type PlatformOption = {
  name: string;
};

type Props = {
  filter: GamesFilter;
  platforms: PlatformOption[];
  onFilterChange: (name: keyof GamesFilter, value: string) => void;
  onApplyFilters: () => void;
  statsToggleLabel?: string;
  onStatsToggle?: () => void;
};

/**
 * Component for filtering games. 
 *
 * @param filter - Initial filter values.
 * @param platforms - Available platform options for autocomplete.
 * @param onApplyFilters - Callback triggered when filters are applied.
 * @param statsToggleLabel - Optional label for toggling statistics view.
 * @param onStatsToggle - Optional callback for toggling statistics.
 * @returns - The filter UI component.
 */
export default function GameFiltersComponent({
  filter,
  platforms,
  onFilterChange,
  onApplyFilters,
  statsToggleLabel,
  onStatsToggle,
}: Props): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    onFilterChange(name as keyof GamesFilter, value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      onApplyFilters();
    }
  }

  return (
    <section className="gameControlsPanel">
      <div className="gameControlsHeader">
        <h3>Filters</h3>
      </div>

      <div className="filterGrid">
        <input
          className="filterInput"
          type="text"
          name="platform"
          list="platform-options"
          placeholder="Filter by platform"
          value={filter.platform ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <datalist id="platform-options">
          {platforms.map((platform) => (
            <option key={platform.name} value={platform.name} />
          ))}
        </datalist>

        <input
          className="filterInput"
          type="text"
          name="genre"
          placeholder="Filter by genre"
          value={filter.genre ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <input
          className="filterInput"
          type="text"
          name="developer"
          placeholder="Filter by developer"
          value={filter.developer ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <input
          className="filterInput"
          type="text"
          name="publisher"
          placeholder="Filter by publisher"
          value={filter.publisher ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="gameReadMore filterButton"
          onClick={onApplyFilters}
        >
          Apply filters
        </button>

        {statsToggleLabel && onStatsToggle && (
          <button
            className="gameReadMore filterButton statsToggleButton"
            onClick={onStatsToggle}
          >
            {statsToggleLabel}
          </button>
        )}
      </div>
    </section>
  );
}
