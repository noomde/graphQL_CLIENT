import { useState, type JSX } from 'react';
import { useScorePerDeveloper } from '../hooks/statisticsHook.ts';
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
 * A component for rendering the average score per developer.
 *
 * @returns A element with the average score per developer data.
 */
export default function ScorePerDeveloperComponent(): JSX.Element {
  const { scorePerDeveloper, loading, error } = useScorePerDeveloper();
  const [page, setPage] = useState(1);
  const [metric, setMetric] = useState<Metric>('averageMetascore');
  const navigate = useNavigate();

  const sortedData = scorePerDeveloper
    ? sortStatisticsData(scorePerDeveloper, metric)
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
      data={scorePerDeveloper}
    >
      <section className="statisticsChartCard">
        <div className="statisticsChartHeader">
          <div>
            <h2>
              Top developers by{' '}
              {metric === 'averageMetascore'
                ? 'average metascore'
                : 'median metascore'}
            </h2>

            <p className="statisticsNote">
              OBS: This chart only shows developers with at least 2 games.
            </p>
          </div>

          <label className="statisticsMetric">
            Metric
            <select value={metric} onChange={handleMetricChange}>
              <option value="averageMetascore">Average metascore</option>
              <option value="medianMetascore">Median metascore</option>
            </select>
          </label>
        </div>

        <div className="statisticsChart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9d4cd" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={100} />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltipComponent />} />
              <Bar
                dataKey={metric}
                fill="#ea7a2f"
                cursor="pointer"
                onClick={(data) => {
                  if (typeof data?.name !== 'string') {
                    return;
                  }

                  navigate(
                    `/nested-games?page=1&limit=25&developer=${encodeURIComponent(data.name)}`,
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="statisticsPagination">
          <button
            className="statisticsPageButton"
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
            className="statisticsPageButton"
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
