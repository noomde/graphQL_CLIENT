import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type JSX,
} from 'react';
import type { GamesFilter } from '../../games/types/inputType';

type PlatformOption = {
  name: string;
};

type Props = {
  filter: GamesFilter;
  platforms: PlatformOption[];
  onApplyFilters: (filter: GamesFilter) => void;
};

export default function GameFiltersComponent({
  filter,
  platforms,
  onApplyFilters,
}: Props): JSX.Element {
  const [localFilter, setLocalFilter] = useState(filter);

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setLocalFilter((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      onApplyFilters(localFilter);
    }
  }

  return (
    <div>
      <h3>Filters</h3>

      <input
        type="text"
        name="platform"
        list="platform-options"
        placeholder="Filter by platform"
        value={localFilter.platform ?? ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
        value={localFilter.genre ?? ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <input
        type="text"
        name="developer"
        placeholder="Filter by developer"
        value={localFilter.developer ?? ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <input
        type="text"
        name="publisher"
        placeholder="Filter by publisher"
        value={localFilter.publisher ?? ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button onClick={() => onApplyFilters(localFilter)}>Apply filters</button>
    </div>
  );
}
