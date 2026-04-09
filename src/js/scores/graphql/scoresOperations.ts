import { gql } from '@apollo/client';

export const GET_SCORES_QUERY = gql`
  query {
    scores(page: 1, limit: 10) {
      items {
        metascore
        metascoreCount
        metascoreSentiment
        userScore
        userScoreCount
        userScoreSentiment
      }
      totalCount
      page
      limit
      totalPages
    }
  }
`;

export const GET_SCORE_QUERY = gql`
  query score($gameId: Int!) {
    score(gameId: $gameId) {
      metascore
      metascoreCount
      metascoreSentiment
      userScore
      userScoreCount
      userScoreSentiment
    }
  }
`;
