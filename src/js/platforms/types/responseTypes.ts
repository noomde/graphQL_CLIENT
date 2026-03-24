/**
 * Defines the reponse data.
 */
export type Platform = {
  id: number;
  name: string;
};

/**
 * Data types for the platforms query response, containing the platform data.
 */
export type platformQueryData = {
  platforms: Platform[];
};
