import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNestedGames } from '../../hooks/useGame.ts';
import { useGameListControls } from '../../hooks/useGamesControls.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';
import { usePlatforms } from '../../../platforms/hooks/usePlatforms.ts';
import GameFiltersComponent from '../../../generic/components/helpers/gameFiltersComponent.tsx';
import PaginationComponent from '../../../generic/components/helpers/paginationControlsComponent.tsx';

/**
 * A component for rendering all games with their scores and platforms.
 *
 * @returns An element with all games, score and platform data.
 */
export default function NestedGamesComponent(): JSX.Element {
  const { platforms } = usePlatforms();
  const controls = useGameListControls();
  const navigate = useNavigate();

  const { games, loading, error } = useNestedGames({
    page: controls.page,
    limit: controls.limit,
    filter: controls.normalizedFilter,
  });

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={games}>
      <div>
        <h1>Games</h1>

        <GameFiltersComponent
          filter={controls.filter}
          platforms={platforms}
          onApplyFilters={controls.applyFilters}
        />

        {games && games.items.length > 0 ? (
          <>
            <PaginationComponent
              page={controls.page}
              totalPages={games.totalPages}
              limit={controls.limit}
              limitOptions={controls.limitOptions}
              onPreviousPage={controls.handlePreviousPage}
              onNextPage={() => controls.handleNextPage(games.totalPages)}
              onLimitChange={controls.handleLimitChange}
            />

            <button
              onClick={() =>
                navigate(
                  `/games?page=${controls.page}&limit=${controls.limit}&platform=${controls.filter.platform}&genre=${controls.filter.genre}&developer=${controls.filter.developer}&publisher=${controls.filter.publisher}`,
                )
              }
            >
              Show less stats
            </button>

            <ul>
              {games.items.map((game) => (
                <li
                  key={game.id}
                  onClick={() => navigate(`/nested-games/${game.id}`)}
                  style={{ cursor: 'pointer' }}
                >
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
          </>
        ) : (
          <p>No games found</p>
        )}
      </div>
    </LoadingOrErrorComponent>
  );
}
