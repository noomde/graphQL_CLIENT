import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors';
import {
  getToken,
  isTokenExpired,
  removeToken,
} from '../../auth/utils/token.ts';

/**
 * HTTP link for sending GraphQL operations to the server.
 */
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
});

/**
 * Clears the current session by removing the stored token and redirecting the user to the login page.
 */
function clearSession() {
  removeToken();

  if (window.location.pathname !== '/login') {
    window.location.assign('/login?sessionExpired=1');
  }
}

/**
 * Error link for handling GraphQL and network authentication errors globally.
 *
 * - Detects GraphQL authentication errors (e.g. UNAUTHENTICATED, token issues).
 * - Clears the session and redirects the user if an authentication issue occurs.
 */
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    const isAuthError = error.errors.some((graphQLError) => {
      return (
        graphQLError.extensions?.code === 'UNAUTHENTICATED' ||
        graphQLError.message.toLowerCase().includes('token') ||
        graphQLError.message.toLowerCase().includes('unauthorized')
      );
    });

    if (isAuthError) {
      clearSession();
    }
  }

  if (ServerError.is(error) && error.statusCode === 401) {
    clearSession();
  }
});

/**
 * Authentication link that attaches a valid JWT token to outgoing requests.
 *
 * @param {object} prevContext - The previous request context.
 * @returns {object} Updated context with headers.
 */
const authLink = new SetContextLink((prevContext) => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    removeToken();

    return {
      headers: {
        ...prevContext.headers,
      },
    };
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: `Bearer ${token}`,
    },
  };
});

/**
 * Apollo Client instance configured with error handling, token attachment and memory caching.
 */
export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});
