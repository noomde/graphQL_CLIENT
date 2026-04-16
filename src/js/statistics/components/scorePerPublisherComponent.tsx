import { type JSX } from 'react';
import { useScorePerPublisher } from '../hooks/statisticsHook.ts';

/**
 * A component for rendering the average score per publisher.
 *
 * @returns A element with the average score per publisher data.
 */
export default function ScorePerPublisherComponent(): JSX.Element {
  const { scorePerPublisher, loading, error } = useScorePerPublisher();

  if (loading) {
    return <p>Loading score per publisher...</p>;
  }

  if (error || !scorePerPublisher) {
    return <p>Failed to load score per publisher, please try again</p>;
  }

  return (
    // add with visualisation module.
  )
}
