import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { type NestedGame } from '../../types/responseType.ts';

import '../../../../css/games/games.css';

type Props = {
  game: NestedGame;
};

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
 * The nested game list as an Element.
 *
 * @param game - A single game from all nested games.
 * @returns -The nested game list.
 */
export default function NestedGameListItem({ game }: Props): JSX.Element {
  const navigate = useNavigate();
  const scoreClass = getScoreClass(game.scores?.metascore);
  const userScoreClass = getScoreClass(
    game.scores?.userScore ? game.scores.userScore * 10 : undefined,
  );

  return (
    <li className={`gameCard ${scoreClass}`}>
      <h2 className="gameTitle">{game.title}</h2>
            <div className="scoreRows">
        <div className="scoreRow">
          <span className="scoreLabel">Metascore</span>
          <span className="scoreBadge">{game.scores?.metascore ?? '-'}</span>
        </div>

        <div className={`scoreRow ${userScoreClass}`}>
          <span className="scoreLabel">UserScore</span>
          <span className="scoreBadge">{game.scores?.userScore ?? '-'}</span>
        </div>
      </div>

      <p className="gameMeta">Release Date: {game.releaseDate}</p>
      <p className="gameMeta">Rating: {game.rating}</p>
      <p className="gameMeta">Genres: {game.genres}</p>

      <p className="gameMeta">
        Platforms: {game.platforms.map((platform) => platform.name).join(', ')}
      </p>

      <p className="gameMeta">Developer: {game.developer}</p>
      <p className="gameMeta">Publisher: {game.publisher}</p>

      <div className="gameFooter">
        <div className="gameActions">
          <button
            className="gameReadMore"
            onClick={() => navigate(`/nested-games/${game.id}`)}
          >
            Read more
          </button>

          <a
            className="gameLink"
            href={`https://www.metacritic.com/game/${game.metacriticId}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Metacritic
          </a>
        </div>

        <p className="gameNumber">#{game.id}</p>
      </div>
    </li>
  );
}
