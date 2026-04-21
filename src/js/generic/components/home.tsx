import { Link } from 'react-router-dom';
import { type JSX } from 'react';
import { isAuthenticated } from '../../auth/utils/isAuthenticated.ts';
import '../../../css/generic/home.css';

const highlights = [
  {
    value: 'Games',
    label: 'Browse titles with scores, genres, developers, publishers and release details.',
  },
  {
    value: 'Platforms',
    label: 'Compare the available platform catalog and see where game data connects.',
  },
  {
    value: 'Dashboard',
    label: 'Review score trends by developer, publisher and platform after logging in.',
  },
];

const sections = [
  {
    title: 'Explore game data',
    text: 'Search through games, open detailed pages and follow nested relationships without leaving the app.',
    href: '/nested-games',
    linkText: 'Open games',
  },
  {
    title: 'Review platforms',
    text: 'Get a clean overview of all platforms and use it as context when comparing game releases.',
    href: '/platforms',
    linkText: 'View platforms',
  },
  {
    title: 'Manage games',
    text: 'Authenticated users can create, update and delete game entries from protected routes.',
    href: '/games/create',
    linkText: 'Create a game',
  },
];

/**
 * Home component that introduces the application's main workflows.
 *
 * @returns {JSX.Element} The home component.
 */
export default function Home(): JSX.Element {
  const loggedIn = isAuthenticated();

  return (
    <main className='homeShell'>
      <section className='homeHero'>
        <div className='homeHeroContent'>
          <p className='homeEyebrow'>GraphQL game catalog</p>
          <h1 className='homeTitle'>MetaStat</h1>
          <p className='homeIntro'>
            A focused client for exploring games, platforms and score statistics
            from one GraphQL API.
          </p>

          <div className='homeActions' aria-label='Primary actions'>
            <Link to='/nested-games' className='homePrimaryAction'>
              Browse games
            </Link>
            <Link to={loggedIn ? '/dashboard' : '/login'} className='homeSecondaryAction'>
              {loggedIn ? 'Open dashboard' : 'Login for dashboard'}
            </Link>
            <Link to='https://www.metacritic.com/' className='homeSecondaryAction'>
              To metacritic
            </Link>
          </div>
        </div>

        <div className='homeScorePanel' aria-label='Application overview'>
          <div className='homeScoreHeader'>
            <span>Meta score</span>
            <strong>88</strong>
          </div>
          <div className='homeScoreRows'>
            <span>Story</span>
            <strong>91</strong>
            <span>Gameplay</span>
            <strong>86</strong>
            <span>Visuals</span>
            <strong>89</strong>
          </div>
        </div>
      </section>

      <section className='homeHighlights' aria-label='Main content areas'>
        {highlights.map((highlight) => (
          <article className='homeHighlight' key={highlight.value}>
            <h2>{highlight.value}</h2>
            <p>{highlight.label}</p>
          </article>
        ))}
      </section>

      <section className='homeContentBand'>
        <div className='homeSectionHeader'>
          <p className='homeEyebrow'>What you can do</p>
          <h2>Everything needed for browsing, editing and analysing the catalog.</h2>
        </div>

        <div className='homeCards'>
          {sections.map((section) => (
            <article className='homeCard' key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
              <Link to={section.href} className='homeCardLink'>
                {section.linkText}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
