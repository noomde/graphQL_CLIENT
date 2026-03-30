import { type JSX } from 'react';
import { usePlatforms } from '../hooks/usePlatforms.ts';

/**
 * A component for rendering platforms.
 *
 * @returns A element with the platform data.
 */
export default function PlatformsComponent(): JSX.Element {
  const { platforms, loading, error } = usePlatforms();

  // TODO update to make more less repetetive
  if (loading) {
    return <p>Loading platforms...</p>;
  }

  if (error) {
    return <p>Failed to load platforms, please try again</p>;
  }

  // TODO add the real rendering of data
  return (
    <div>
      <h1>Platforms</h1>
      <ul>
        {platforms.map((platform) => (
          <li key={platform.id}>{platform.name}</li>
        ))}
      </ul>
    </div>
  );
}
