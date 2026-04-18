import { type JSX } from 'react';
import { useNestedGames } from '../../hooks/useGame.ts';
import { useGameListControls } from '../../hooks/useGamesControls.ts';
import LoadingOrErrorComponent from '../../../generic/components/loadingOrErrorComponent.tsx';
import { usePlatforms } from '../../../platforms/hooks/usePlatforms.ts';
import GameFiltersComponent from '../../../generic/components/gameFiltersComponent.tsx';
import PaginationComponent from '../../../generic/components/paginationControlsComponent.tsx';

/**
 * A component for rendering all games with their scores and platforms.
 *
 * @returns An element with all games, score and platform data.
 */
export default function NestedGamesComponent(): JSX.Element {
  const { platforms } = usePlatforms();
  const controls = useGameListControls();

  const { games, loading, error } = useNestedGames({
    page: controls.page,
    limit: controls.limit,
    filter: controls.normalizedFilter,
  });

  if (!games) {
    return (
      <LoadingOrErrorComponent loading={loading} error={error} data={games} />
    );
  }

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={games}>
      <div>
        <h1>Games with score and platforms</h1>

        <GameFiltersComponent
          filter={controls.filter}
          platforms={platforms}
          onFilterChange={controls.handleFilterChange}
        />

        <PaginationComponent
          page={controls.page}
          totalPages={games.totalPages}
          limit={controls.limit}
          limitOptions={controls.limitOptions}
          onPreviousPage={controls.handlePreviousPage}
          onNextPage={() => controls.handleNextPage(games.totalPages)}
          onLimitChange={controls.handleLimitChange}
        />

        <ul>
          {games.items.map((game, id) => (
            <li key={id}>
              <h2>{game.title}</h2>

              <p>Release Date: {game.releaseDate}</p>
              <p>Rating: {game.rating}</p>
              <p>Genres: {game.genres}</p>
              <p>Description: {game.description}</p>
              <p>Developer: {game.developer}</p>
              <p>Publisher: {game.publisher}</p>
              <p>Metacritic url: {game.metacriticId}</p>

              <p>
                Platforms:{' '}
                {game.platforms.map((platform) => platform.name).join(', ')}
              </p>

              <p>Metascore: {game.scores?.metascore}</p>
              <p>Metascore Count: {game.scores?.metascoreCount}</p>
              <p>Metascore Sentiment: {game.scores?.metascoreSentiment}</p>
              <p>UserScore: {game.scores?.userScore}</p>
              <p>UserScore Count: {game.scores?.userScoreCount}</p>
              <p>UserScore Sentiment: {game.scores?.userScoreSentiment}</p>
            </li>
          ))}
        </ul>
      </div>
    </LoadingOrErrorComponent>
  );
}
