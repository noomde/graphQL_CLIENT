import { type JSX } from 'react';
import { useScorePerPlatform } from '../hooks/statisticsHook.ts';

/**
 * A component for rendering the average score per platform.
 *
 * @returns A element with the average score per platform data.
 */
export default function ScoreComponent(): JSX.Element {
  const { scorePerPlatform, loading, error } = useScorePerPlatform();

  if (loading) {
    return <p>Loading score per platform...</p>;
  }

  if (error || !scorePerPlatform) {
    return <p>Failed to load score per platform, please try again</p>;
  }

  return (
    // add with visualisation module.
  )
}
