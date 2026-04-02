export const RATINGS = ['E', 'E10+', 'T', 'M', 'AO', 'RP', 'K-A'] as const;

/**
 * Defines the Rating type as a union of the string literals in the RATINGS array.
 */
export type Rating = (typeof RATINGS)[number];
