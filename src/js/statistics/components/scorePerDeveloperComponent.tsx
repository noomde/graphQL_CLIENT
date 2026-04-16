import { type JSX } from 'react';
import { useScorePerDeveloper } from '../hooks/statisticsHook.ts';

/**
 * A component for rendering the average score per developer.
 *
 * @returns A element with the average score per developer data.
 */
export default function ScorePerDeveloperComponent(): JSX.Element {
  const { scorePerDeveloper, loading, error } = useScorePerDeveloper();

  if (loading) {
    return <p>Loading score per developer...</p>;
  }

  if (error || !scorePerDeveloper) {
    return <p>Failed to load score per developer, please try again</p>;
  }

  return (
    // add with visualisation module.
  )
}