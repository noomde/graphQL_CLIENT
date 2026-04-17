import { type Statistics } from '../../statistics/types/responseTypes.ts';

type Metric = 'averageMetascore' | 'medianMetascore';

/**
 * Sorts statistics data.
 *
 * @param data - The data to be sorted
 * @param metric - Depending on if the user wants to see average or median score.
 * @returns - The sorted data.
 */
export function sortStatisticsData(
  data: Statistics[],
  metric: Metric,
  minGameCount = 2,
): Statistics[] {
  const sortedData = [...data]
    .filter((item) => item.gameCount >= minGameCount)
    .sort((a, b) => b[metric] - a[metric]);

  return sortedData;
}

/**
 * Returns the total amount of pages.
 *
 * @param sortedData - The sorted data.
 * @param pageSize - The size of each page (ex. 10 publishers).
 * @returns - The total amount of pages.
 */
export function getTotalPages(
  sortedData: Statistics[],
  pageSize: number,
): number {
  if (pageSize <= 0) {
    return 1;
  }

  return Math.ceil(sortedData.length / pageSize);
}

/**
 * Returns the paginated chart data.
 *
 * @param sortedData - The sorted data.
 * @param page - The current page.
 * @param pageSize - The size of the pages.
 * @returns - The chart data.
 */
export function getPaginatedChartData(
  sortedData: Statistics[],
  page: number,
  pageSize: number,
): Statistics[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return sortedData.slice(startIndex, endIndex);
}
