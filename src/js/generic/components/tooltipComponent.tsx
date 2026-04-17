import { type JSX } from 'react';
import { type CustomTooltipProps } from '../../statistics/types/tooltipData.ts';

/**
 * Renders a custom tooltip for the chart.
 *
 *
 * @param active - Indicates if the tooltip is currently visible.
 * @param payload - The data provided by Recharts for the hovered bar.
 * @returns A styled tooltip element or null if no tooltip should be shown.
 */
export function CustomTooltipComponent({
  active,
  payload,
}: CustomTooltipProps): JSX.Element | null {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '0.75rem',
      }}
    >
      <p>
        <strong>{data.name}</strong>
      </p>
      <p>Average metascore: {data.averageMetascore}</p>
      <p>Median metascore: {data.medianMetascore}</p>
      <p>Game count: {data.gameCount}</p>
    </div>
  );
}
