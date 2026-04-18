import { gql } from '@apollo/client';

/**
 * Defines the query for all platforms with id and name.
 */
export const GET_PLATFORMS_QUERY = gql`
  query {
    platforms {
      id
      name
    }
  }
`;
