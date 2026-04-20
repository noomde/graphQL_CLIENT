import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNestedGame } from '../../hooks/useGame.ts';
import LoadingOrErrorComponent from '../../../generic/components/helpers/loadingOrErrorComponent.tsx';

import '../../../../css/games/games.css';

function getScoreClass(score?: number): string {
  if (!score) {
    return 'scoreUnknown';
  }

  if (score >= 85) {
    return 'scoreExcellent';
  }

  if (score >= 70) {
    return 'scoreGood';
  }

  if (score >= 50) {
    return 'scoreMixed';
  }

  return 'scoreLow';
}

/**
 * A component for rendering a game with nested data (score and platforms).
 *
 * @param id - the id of the game.
 * @returns An element with the game, score and platform data for a specific game.
 */
export default function NestedGameComponent({
  id,
}: {
  id: number;
}): JSX.Element {
  const { game, loading, error } = useNestedGame(id);
  const navigate = useNavigate();

  if (!game) {
    return (
      <LoadingOrErrorComponent loading={loading} error={error} data={game} />
    );
  }

  const scoreClass = getScoreClass(game.scores?.metascore);
  const userScoreClass = getScoreClass(
    game.scores?.userScore ? game.scores.userScore * 10 : undefined,
  );

  return (
    <LoadingOrErrorComponent loading={loading} error={error} data={game}>
      <article className={`gameDetailCard ${scoreClass}`}>
        <div className="gameDetailHeader">
          <div>
            <p className="gameDetailEyebrow">Nested game #{game.id}</p>
            <h1 className="gameDetailTitle">{game.title}</h1>
          </div>

          <a
            className="gameLink"
            href={`https://www.metacritic.com/game/${game.metacriticId}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Metacritic
          </a>
        </div>

        <div className="scoreRows gameDetailScores">
          <div className="scoreRow">
            <span className="scoreLabel">Metascore</span>
            <span className="scoreBadge">{game.scores?.metascore ?? '-'}</span>
          </div>

          <div className={`scoreRow ${userScoreClass}`}>
            <span className="scoreLabel">UserScore</span>
            <span className="scoreBadge">{game.scores?.userScore ?? '-'}</span>
          </div>
        </div>

        <section className="gameInfoGrid">
          <p className="gameMeta">Release Date: {game.releaseDate}</p>
          <p className="gameMeta">Rating: {game.rating}</p>
          <p className="gameMeta">Genres: {game.genres}</p>
          <p className="gameMeta">Developer: {game.developer}</p>
          <p className="gameMeta">Publisher: {game.publisher}</p>
          <p className="gameMeta">Metacritic ID: {game.metacriticId}</p>
          <p className="gameMeta">
            Platforms:{' '}
            {game.platforms.map((platform) => platform.name).join(', ')}
          </p>
          <p className="gameMeta">
            Metascore Count: {game.scores?.metascoreCount ?? '-'}
          </p>
          <p className="gameMeta">
            Metascore Sentiment: {game.scores?.metascoreSentiment ?? '-'}
          </p>
          <p className="gameMeta">
            UserScore Count: {game.scores?.userScoreCount ?? '-'}
          </p>
          <p className="gameMeta">
            UserScore Sentiment: {game.scores?.userScoreSentiment ?? '-'}
          </p>
        </section>

        <p className="gameDescription gameDetailDescription">
          {game.description}
        </p>

        <div className="gameDetailActions">
          <button
            className="gameReadMore"
            onClick={() => navigate(`/games/update/${game.id}`)}
          >
            Update game
          </button>

          <button
            className="gameDangerButton"
            onClick={() => navigate(`/games/delete/${game.id}`)}
          >
            Delete game
          </button>
        </div>
      </article>
    </LoadingOrErrorComponent>
  );
}
