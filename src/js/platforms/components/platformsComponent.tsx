import { type JSX } from 'react';
import { usePlatforms } from '../hooks/usePlatforms.ts';
import LoadingOrErrorComponent from '../../generic/components/helpers/loadingOrErrorComponent.tsx';

import '../../../css/platforms/platforms.css';

/**
 * A component for rendering platforms.
 *
 * @returns An element with the platform data.
 */
export default function PlatformsComponent(): JSX.Element {
  const { platforms, loading, error } = usePlatforms();

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={platforms}>
      <main className="platformsShell">
        <section className="platformsHero">
          <p className="platformsEyebrow">Game systems</p>
          <h1 className="platformsTitle">Platforms</h1>
          <p className="platformsSummary">
            {platforms.length} platforms available
          </p>
        </section>

        <ul className="platformsGrid">
          {platforms.map((platform) => (
            <li className="platformCard" key={platform.id}>
              <p className="platformNumber">#{platform.id}</p>
              <h2 className="platformName">{platform.name}</h2>
            </li>
          ))}
        </ul>
      </main>
    </LoadingOrErrorComponent>
  );
}
