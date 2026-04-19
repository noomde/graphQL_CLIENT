import { useState, type JSX } from 'react';
import { useScorePerPublisher } from '../hooks/statisticsHook.ts';
import { useNavigate } from 'react-router-dom';
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
import LoadingOrErrorComponent from '../../generic/components/helpers/loadingOrErrorComponent.tsx';
import { CustomTooltipComponent } from '../../generic/components/helpers/tooltipComponent.tsx';

const PAGE_SIZE = 15;
type Metric = 'averageMetascore' | 'medianMetascore';

/**
 * A component for rendering the average score per publisher.
 *
 * @returns A element with the average score per publisher data.
 */
export default function ScorePerPublisherComponent(): JSX.Element {
  const { scorePerPublisher, loading, error } = useScorePerPublisher();
  const [page, setPage] = useState(1);
  const [metric, setMetric] = useState<Metric>('averageMetascore');
  const navigate = useNavigate();

  const sortedData = scorePerPublisher
    ? sortStatisticsData(scorePerPublisher, metric)
    : [];

  const totalPages = getTotalPages(sortedData, PAGE_SIZE);
  const chartData = getPaginatedChartData(sortedData, page, PAGE_SIZE);

  /**
   * handles the change of metric view.
   *
   * @param event - The event handler.
   */
  function handleMetricChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setMetric(event.target.value as Metric);
    setPage(1);
  }

  return (
    <LoadingOrErrorComponent
      loading={loading}
      error={error}
      data={scorePerPublisher}
    >
      <section>
        <h3>
          Top publishers by{' '}
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
              <Bar
                dataKey={metric}
                cursor="pointer"
                onClick={(data) => {
                  if (typeof data?.name !== 'string') {
                    return;
                  }

                  navigate(
                    `/nested-games?page=1&limit=25&publisher=${encodeURIComponent(data.name)}`,
                  );
                }}
              />
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
