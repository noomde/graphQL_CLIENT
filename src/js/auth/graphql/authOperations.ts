import { gql } from '@apollo/client'

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

