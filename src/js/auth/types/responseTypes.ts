/**
 * Data type for the login mutation response, containing the authentication token.
 */
export type LoginMutationData = {
  loginUser: {
    token: string;
  } | null;
};

/**
 * Data type for the register mutation response, containing the registered user's information.
 */
export type RegisterMutationData = {
  registerUser: {
    id: string;
    username: string;
  } | null;
};

/**
 * Data type for the oauth login mutation response, containing the registered user's information.
 */
export type OauthMutationData = {
  oauthLoginUser: {
    token: string;
  } | null;
};
