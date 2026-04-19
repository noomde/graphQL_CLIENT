import { type JSX } from 'react';
import { useScores } from '../hooks/scoreHook.ts';
import LoadingOrErrorComponent from '../../generic/components/helpers/loadingOrErrorComponent.tsx';

/**
 * A component for rendering all the scores.
 *
 * @returns A element with all score data.
 */
export default function ScoresComponent(): JSX.Element {
  const { scores, loading, error } = useScores();

  if (!scores) {
    return (
      <LoadingOrErrorComponent loading={loading} error={error} data={scores} />
    );
  }

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={scores}>
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
    </LoadingOrErrorComponent>
  );
}
