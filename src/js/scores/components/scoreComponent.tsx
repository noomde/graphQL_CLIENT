import { type JSX } from 'react';
import { useScore } from '../hooks/scoreHook.ts';

/**
 * A component for rendering a score.
 *
 * @returns A element with the score data.
 */
export default function ScoreComponent(): JSX.Element {
  const { score, loading, error } = useScore();

  // TODO update to make more less repetetive
  if (loading) {
    return <p>Loading score...</p>;
  }

  if (error || !score) {
    return <p>Failed to load score, please try again</p>;
  }

  // TODO add the real rendering of data
  return (
    <div>
      <h1>Score</h1>

      <p>Metascore: {score.metascore}</p>
      <p>Metascore Count: {score.metascoreCount}</p>
      <p>Metascore Sentiment: {score.metascoreSentiment}</p>
      <p>UserScore: {score.userScore}</p>
      <p>UserScore Count: {score.userScoreCount}</p>
      <p>UserScore Sentiment: {score.userScoreSentiment}</p>
    </div>
  );
}
