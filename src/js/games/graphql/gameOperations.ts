import { gql } from '@apollo/client';

export const GET_GAME_QUERY = gql`
  query getGame($id: Int!) {
    game(id: $id) {
      id
      metacriticId
      title
      releaseDate
      rating
      genres
      description
      developer
      publisher
    }
  }
`;

export const GET_GAMES_QUERY = gql`
  query getGames{
    games {
      items {
        id
        metacriticId
        title
        releaseDate
        rating
        genres
        description
        developer
        publisher
      }
      totalCount
      page
      limit
      totalPages
    }
  }
`;

export const GET_NESTED_GAMES_QUERY = gql`
  query getNestedGames{
    games {
      items {
        id
        metacriticId
        title
        releaseDate
        rating
        genres
        description
        developer
        publisher
        scores {
          metascore
          metascoreCount
          metascoreSentiment
          userScore
          userScoreCount
          userScoreSentiment
        }
        platforms {
          name
        }
      }
      totalCount
      page
      limit
      totalPages
    }
  }
`;

export const GET_NESTED_GAME_QUERY = gql`
  query getNestedGame($id: Int!) {
    game(id: $id) {
      id
      metacriticId
      title
      releaseDate
      rating
      genres
      description
      developer
      publisher
      scores {
        metascore
        metascoreCount
        metascoreSentiment
        userScore
        userScoreCount
        userScoreSentiment
      }
      platforms {
        name
      }
    }
  }
`;

export const CREATE_GAME_MUTATION = gql`
  mutation createGame(
    $title: String!
    $genres: String!
    $releaseDate: String
    $rating: String
    $description: String
    $developer: String
    $publisher: String
  ) {
    createGame(
      title: $title
      genres: $genres
      releaseDate: $releaseDate
      rating: $rating
      description: $description
      developer: $developer
      publisher: $publisher
    ) {
      id
      metacriticId
      title
      releaseDate
      rating
      genres
      description
      developer
      publisher
    }
  }
`;

export const UPDATE_GAME_MUTATION = gql`
  mutation updateGame(
    $id: Int!
    $title: String!
    $genres: String!
    $releaseDate: String
    $rating: String
    $description: String
    $developer: String
    $publisher: String
  ) {
    updateGame(
      id: $id
      title: $title
      genres: $genres
      releaseDate: $releaseDate
      rating: $rating
      description: $description
      developer: $developer
      publisher: $publisher
    ) {
      id
      metacriticId
      title
      releaseDate
      rating
      genres
      description
      developer
      publisher
    }
  }
`;

export const DELETE_GAME_MUTATION = gql`
  mutation deleteGame($id: Int!) {
    deleteGame(id: $id) {
      message
    }
  }
`;
