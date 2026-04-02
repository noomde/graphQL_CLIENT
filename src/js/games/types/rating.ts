export const RATINGS = ['E', 'E10+', 'T', 'M', 'AO', 'RP', 'K-A'] as const;

export type Rating = (typeof RATINGS)[number];
