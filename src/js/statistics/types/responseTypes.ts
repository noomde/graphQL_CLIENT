export type Statistics = {
  name: string;
  averageMetascore: string;
  medianMetascore: string;
  gameCount: number;
};

export type scorePerPlatformData = {
  averageScorePerPlatform: Statistics[];
};

export type scorePerDeveloperData = {
  averageScorePerDeveloper: Statistics[];
};

export type scorePerPublisherData = {
  averageScorePerPublisher: Statistics[];
};
