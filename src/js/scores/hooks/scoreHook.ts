import {
  GET_SCORE_QUERY,
  GET_SCORES_QUERY,
} from '../graphql/scoresOperations.ts';
import {
  type scoreQueryData,
  type scoresQueryData,
} from '../types/responseTypes.ts';
import { useQuery } from '@apollo/client/react';

/**
 * A custom hook for querying a specific score.
 *
 * @returns the score data.
 */
export function useScore() {
  const { data, loading, error } = useQuery<scoreQueryData>(GET_SCORE_QUERY);

  return {
    score: data?.score,
    loading,
    error,
  };
}

/**
 * A custom hook for querying all scores with metadata.
 *
 * @returns the scores data.
 */
export function useScores() {
  const { data, loading, error } = useQuery<scoresQueryData>(GET_SCORES_QUERY);

  return {
    scores: data?.scores,
    loading,
    error,
  };
}
