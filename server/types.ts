export type TokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

export type User = {
  id: number;
  login: string;
  name?: string;
  email?: string | null;
};