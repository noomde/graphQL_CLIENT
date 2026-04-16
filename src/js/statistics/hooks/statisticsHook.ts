import {
  GET_AVERAGE_SCORE_PER_DEVELOPER_QUERY,
  GET_AVERAGE_SCORE_PER_PLATFORM_QUERY,
  GET_AVERAGE_SCORE_PER_PUBLISHER_QUERY,
} from '../graphql/statisticsOperations.ts';
import type {
  scorePerDeveloperData,
  scorePerPlatformData,
  scorePerPublisherData,
} from '../types/responseTypes.ts';
import { useQuery } from '@apollo/client/react';

/**
 * A custom hook for querying average score per platform.
 *
 * @returns the average score per platform data.
 */
export function useScorePerPlatform() {
  const { data, loading, error } = useQuery<scorePerPlatformData>(
    GET_AVERAGE_SCORE_PER_PLATFORM_QUERY,
  );

  return {
    scorePerPlatform: data?.averageScorePerPlatform ?? [],
    loading,
    error,
  };
}

/**
 * A custom hook for querying average score per developer.
 *
 * @returns the average score per developer data.
 */
export function useScorePerDeveloper() {
  const { data, loading, error } = useQuery<scorePerDeveloperData>(
    GET_AVERAGE_SCORE_PER_DEVELOPER_QUERY,
  );

  return {
    scorePerDeveloper: data?.averageScorePerDeveloper ?? [],
    loading,
    error,
  };
}

/**
 * A custom hook for querying average scoer per publisher
 *
 * @returns the average score per publisher data.
 */
export function useScorePerPublisher() {
  const { data, loading, error } = useQuery<scorePerPublisherData>(
    GET_AVERAGE_SCORE_PER_PUBLISHER_QUERY,
  );

  return {
    scorePerPublisher: data?.averageScorePerPublisher ?? [],
    loading,
    error,
  };
}
