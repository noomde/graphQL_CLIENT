import { type JSX } from 'react';
import { useScores } from '../hooks/scoreHook.ts';

export default function ScoresComponent(): JSX.Element {
  const { scores, loading, error } = useScores();

  // TODO update to make more less repetetive
  if (loading) {
    return <p>Loading scores...</p>;
  }

  if (error || !scores) {
    return <p>Failed to load scores, please try again</p>;
  }

  // TODO add the real rendering of data
  return (
    <div>
      <h1>Scores</h1>

      <ul>
        {scores.items.map((score, index) => (
          <li key={index}>
            <p>Metascore: {score.metascore}</p>
            <p>Metascore Count: {score.metascoreCount}</p>
            <p>Metascore Sentiment: {score.metascoreSentiment}</p>
            <p>User Score: {score.userScore}</p>
            <p>User Score Count: {score.userScoreCount}</p>
            <p>User Score Sentiment: {score.userScoreSentiment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
