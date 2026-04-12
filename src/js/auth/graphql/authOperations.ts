import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation registerUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const OAUTH_LOGIN_MUTATION = gql`
  mutation oauthLoginUser(
    $provider: String!
    $providerId: String!
    $username: String
  ) {
    oauthLoginUser(
      provider: $provider
      providerId: $providerId
      username: $username
    ) {
      token
    }
  }
`;
