/**
 * Data types for the score query response, containing the score data.
 */
export type scoreQueryData = {
  score: {
    metascore: number;
    metascoreCount: number;
    metascoreSentiment: string;
    userScore: number;
    userScoreCount: number;
    userScoreSentiment: string;
  } | null;
};
