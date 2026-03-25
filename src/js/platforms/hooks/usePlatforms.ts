import { GET_PLATFORMS_QUERY } from '../graphql/platformsOperations';
import { type PlatformsQueryData } from '../types/responseTypes';
import { useQuery } from '@apollo/client/react';

/**
 * A custom hook for querying all platforms.
 *
 * @returns The platform data.
 */
export function usePlatforms() {
  const { data, loading, error } =
    useQuery<PlatformsQueryData>(GET_PLATFORMS_QUERY);

  return {
    platforms: data?.platforms ?? [],
    loading,
    error,
  };
}
