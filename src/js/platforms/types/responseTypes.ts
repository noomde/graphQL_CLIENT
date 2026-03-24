/**
 * Data types for the platforms query response, containing the platform data.
 */
export type platformQueryData = {
  platforms: {
    id: number;
    name: string;
  }[];
};
