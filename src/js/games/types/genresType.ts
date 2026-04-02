export const GENRES = [
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Simulation',
  'Puzzle',
  'Shooter',
  'Platformer',
  'Fighting',
  'Racing',
  'Sports',
  'Horror',
  'Survival',
  'Stealth',
  'Sandbox',
  'Open World',
  'Party',
  'Music',
  'Rhythm',
  'Visual Novel',
  'Card Game',
  'Board Game',
  'Trivia',
  'Arcade',
  'Educational',
  'MMO',
  'VR',
] as const;

/**
 * Defines the Genre type as a union of the string literals in the GENRES array.
 */
export type Genre = (typeof GENRES)[number];
