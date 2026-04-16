/**
 * Defines the response data.
 */
export type Statistics = {
  name: string;
  averageMetascore: string;
  medianMetascore: string;
  gameCount: number;
};

/**
 * Data types for the average score per platform response.
 */
export type scorePerPlatformData = {
  averageScorePerPlatform: Statistics[];
};

/**
 * Data types for the average score per devloper response.
 */
export type scorePerDeveloperData = {
  averageScorePerDeveloper: Statistics[];
};

/**
 * Data types for the average score per publisher response.
 */
export type scorePerPublisherData = {
  averageScorePerPublisher: Statistics[];
};
