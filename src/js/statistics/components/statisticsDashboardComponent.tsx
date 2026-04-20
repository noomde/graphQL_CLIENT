import { useState, type JSX } from 'react';
import ScorePerDeveloperComponent from './scorePerDeveloperComponent.tsx';
import ScorePerPlatformComponent from './scorePerPlatformComponent.tsx';
import ScorePerPublisherComponent from './scorePerPublisherComponent.tsx';

import '../../../css/statistics/statistics.css';

type View = 'publisher' | 'developer' | 'platform';

/**
 * A component for switching between different statistics visualizations.
 *
 * @returns A dashboard with different statistics views.
 */
export default function StatisticsDashboardComponent(): JSX.Element {
  const [view, setView] = useState<View>('publisher');

  /**
   * Returns true if the active view is the same view as the button.
   *
   * @param currentView - The current view button
   * @returns - true if the loaded view is publisher and the current view is publisher aswell.
   */
  function isActive(currentView: View): boolean {
    return view === currentView;
  }

  return (
    <main className="statisticsShell">
      <aside className="statisticsSidebar">
        <div className="statisticsTabs" aria-label="Statistics views">
          <button
            className="statisticsTab"
            onClick={() => setView('publisher')}
            disabled={isActive('publisher')}
          >
            Publisher
          </button>

          <button
            className="statisticsTab"
            onClick={() => setView('developer')}
            disabled={isActive('developer')}
          >
            Developer
          </button>

          <button
            className="statisticsTab"
            onClick={() => setView('platform')}
            disabled={isActive('platform')}
          >
            Platform
          </button>
        </div>
      </aside>

      <section className="statisticsContent">
        <section className="statisticsHero">
          <p className="statisticsEyebrow">Dashboard</p>
          <h1 className="statisticsTitle">Statistics dashboard</h1>
        </section>

        {view === 'publisher' && <ScorePerPublisherComponent />}
        {view === 'developer' && <ScorePerDeveloperComponent />}
        {view === 'platform' && <ScorePerPlatformComponent />}
      </section>
    </main>
  );
}
