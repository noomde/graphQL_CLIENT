import { useMutation } from '@apollo/client/react';
import { OAUTH_LOGIN_MUTATION } from '../graphql/authOperations.ts';
import type { OauthMutationData } from '../types/responseTypes.ts';

/**
 * A custom hook for creating or login in a user through OAuth.
 *
 * @returns The jwt token.
 */
export function useOAuthLogin() {
  const [mutate, { loading, error }] =
    useMutation<OauthMutationData>(OAUTH_LOGIN_MUTATION);

  async function oauthLogin(input: {
    provider: string;
    providerId: string;
    username: string;
  }) {
    const result = await mutate({
      variables: {
        provider: input.provider,
        providerId: input.providerId,
        username: input.username,
      },
    });

    return result.data?.oauthLoginUser ?? null;
  }

  return {
    oauthLogin,
    loading,
    error,
  };
}
