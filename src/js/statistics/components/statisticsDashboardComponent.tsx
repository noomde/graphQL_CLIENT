import { useState, type JSX } from 'react';
import ScorePerDeveloperComponent from './scorePerDeveloperComponent.tsx';
import ScorePerPlatformComponent from './scorePerPlatformComponent.tsx';
import ScorePerPublisherComponent from './scorePerPublisherComponent.tsx';

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
    <section>
      <h2>Statistics dashboard</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setView('publisher')}
          disabled={isActive('publisher')}
        >
          Publisher
        </button>

        <button
          onClick={() => setView('developer')}
          disabled={isActive('developer')}
        >
          Developer
        </button>

        <button
          onClick={() => setView('platform')}
          disabled={isActive('platform')}
        >
          Platform
        </button>
      </div>

      {view === 'publisher' && <ScorePerPublisherComponent />}
      {view === 'developer' && <ScorePerDeveloperComponent />}
      {view === 'platform' && <ScorePerPlatformComponent />}
    </section>
  );
}
