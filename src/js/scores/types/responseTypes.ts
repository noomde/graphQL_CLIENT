/**
 * Defines the response data.
 */
export type Score = {
  metascore: number;
  metascoreCount: number;
  metascoreSentiment: string;
  userScore: number;
  userScoreCount: number;
  userScoreSentiment: string;
};



/**
 * Data types for the score query response, containing the score data.
 */
export type scoreQueryData = {
  score: Score | null;
};

/**
 * Data types for the scores query response, containing the score data with metadata.
 */
export type scoresQueryData = {
  scores: Score[]
}