import { useState, type JSX } from 'react';
import { useScorePerPlatform } from '../hooks/statisticsHook.ts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  sortStatisticsData,
  getTotalPages,
  getPaginatedChartData,
} from '../../generic/helpers/chartHelper.ts';
import LoadingOrErrorComponent from '../../generic/components/loadingOrErrorComponent.tsx';
import { CustomTooltipComponent } from '../../generic/components/tooltipComponent.tsx';

const PAGE_SIZE = 25;
type Metric = 'averageMetascore' | 'medianMetascore';

/**
 * A component for rendering the average score per platform.
 *
 * @returns A element with the average score per platform data.
 */
export default function ScorePerPlatformComponent(): JSX.Element {
  const { scorePerPlatform, loading, error } = useScorePerPlatform();
  const [page, setPage] = useState(1);
  const [metric, setMetric] = useState<Metric>('averageMetascore');

  const sortedData = scorePerPlatform
    ? sortStatisticsData(scorePerPlatform, metric)
    : [];

  const totalPages = getTotalPages(sortedData, PAGE_SIZE);
  const chartData = getPaginatedChartData(sortedData, page, PAGE_SIZE);

  function handleMetricChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setMetric(event.target.value as Metric);
    setPage(1);
  }

  return (
    <LoadingOrErrorComponent
      loading={loading}
      error={error}
      data={scorePerPlatform}
    >
      <section>
        <h3>
          Top platforms by{' '}
          {metric === 'averageMetascore'
            ? 'average metascore'
            : 'median metascore'}
        </h3>

        <label>
          Metric:{' '}
          <select value={metric} onChange={handleMetricChange}>
            <option value="averageMetascore">Average metascore</option>
            <option value="medianMetascore">Median metascore</option>
          </select>
        </label>

        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={100} />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltipComponent />} />
              <Bar dataKey={metric} cursor="pointer" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={() =>
              setPage((currentPage) => Math.max(currentPage - 1, 1))
            }
            disabled={page === 1}
          >
            Previous
          </button>

          <p>
            Page {page} of {totalPages || 1}
          </p>

          <button
            onClick={() =>
              setPage((currentPage) =>
                Math.min(currentPage + 1, totalPages || 1),
              )
            }
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </section>
    </LoadingOrErrorComponent>
  );
}
