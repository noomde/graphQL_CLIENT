import { gql } from '@apollo/client';

export const GET_SCORES_QUERY = gql`
  query {
    scores {
      metascore
      metascoreCount
      metascoreSentiment
      userScore
      userScoreCount
      userScoreSentiment
    }
  }
`;

export const GET_SCORE_QUERY = gql`
  query score(gameId: Int!) {
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
