import { gql } from '@apollo/client';

export const GET_AVERAGE_SCORE_PER_PLATFORM_QUERY = gql`
  query GetAverageScorePerPlatform {
    averageScorePerPlatform {
      name
      averageMetascore
      medianMetascore
      gameCount
    }
  }
`;

export const GET_AVERAGE_SCORE_PER_DEVELOPER_QUERY = gql`
  query GetAverageScorePerDeveloper {
    averageScorePerDeveloper {
      name
      averageMetascore
      medianMetascore
      gameCount
    }
  }
`;

export const GET_AVERAGE_SCORE_PER_PUBLISHER_QUERY = gql`
  query GetAverageScorePerPublisher {
    averageScorePerPublisher {
      name
      averageMetascore
      medianMetascore
      gameCount
    }
  }
`;
