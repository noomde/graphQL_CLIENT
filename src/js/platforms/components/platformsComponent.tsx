import { type JSX } from 'react';
import { usePlatforms } from '../hooks/usePlatforms.ts';

/**
 * 
 *
 * @returns 
 */
export default function PlatformsComponent(): JSX.Element {
  const { platforms, loading, error } = usePlatforms();

  if (loading) {
    return <p>Loading platforms...</p>;
  }

  if (error) {
    return <p>Failed to load platforms, please try again</p>;
  }

  return (
    <div>
      <h1>Platforms</h1>
      <ul>
        {platforms.map((platform) => (
          <li key={platform.id}>{platform.name}</li> // TODO add the real rendering of data
        ))}
      </ul>
    </div>
  );
}
