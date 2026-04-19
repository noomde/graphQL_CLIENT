import StatisticsDashboardComponent from '../components/statisticsDashboardComponent.tsx';
import Header from '../../generic/components/header.tsx';
import { type JSX } from 'react';

/**
 * Statistics dashboard component serves as the page for all statistics.
 *
 * @returns The statistics dashboard page.
 */
export default function StatisticsDashboardPage(): JSX.Element {
  return (
    <>
      <Header></Header>
      <StatisticsDashboardComponent />;
    </>
  );
}
