import { ApolloClient } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/authOperations';
import { setToken, removeToken, decodeToken } from '../utils/token';
import type { AuthCredentials, DecodedUser } from '../types/authTypes';
import type {
  LoginMutationData,
  RegisterMutationData,
} from '../types/dataTypes';
import type React from 'react';

type SetUser = React.Dispatch<React.SetStateAction<DecodedUser | null>>;

/**
 * Handles the login action by sending a login mutation.
 *
 * @param client - The Apollo Client instance used to perform the mutation.
 * @param credentials - The user's login credentials (username and password).
 * @param setUser - A state setter function to update the user information in the application state.
 * @throws Will throw an error if the login fails or if no token is received.
 */
export async function loginAction(
  client: ApolloClient,
  credentials: AuthCredentials,
  setUser: SetUser,
) {
  const { data } = await client.mutate<LoginMutationData>({
    mutation: LOGIN_MUTATION,
    variables: { input: credentials },
  });

  const token = data?.loginUser?.token;

  if (!token) {
    throw new Error('Login failed');
  }

  setToken(token);
  setUser(decodeToken(token));
}

/**
 * Handles the register action by sending a register mutation.
 *
 * @param client - The Apollo Client instance used to perform the mutation.
 * @param credentials - The user's registration credentials.
 * @throws Will throw an error if the registration fails.
 */
export async function registerAction(
  client: ApolloClient,
  credentials: AuthCredentials,
) {
  const { data } = await client.mutate<RegisterMutationData>({
    mutation: REGISTER_MUTATION,
    variables: { input: credentials },
  });

  if (!data?.registerUser) {
    throw new Error('Registration failed');
  }
}

/**
 * Handles the logout action by removing the JWT token and clearing the user state.
 *
 * @param setUser - A state setter function to clear the user information in the application state.
 */
export async function logoutAction(setUser: SetUser) {
  removeToken();
  setUser(null);
}
