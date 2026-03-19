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
    throw new Error('Login failed: No token received');
  }

  setToken(token);
  setUser(decodeToken(token));
}