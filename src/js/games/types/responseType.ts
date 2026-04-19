import { type Score } from './scorerResponseTypes.ts';
import { type Platform } from '../../platforms/types/responseTypes.ts';

/**
 * Defines the game response data.
 */
type Game = {
  id: number;
  metacriticId: number;
  title: string;
  releaseDate: string;
  rating: string;
  genres: string;
  description: string;
  developer: string;
  publisher: string;
};

/**
 * Defines the nested game response data.
 */
type NestedGame = Game & {
  scores: Score | null;
  platforms: Platform[];
};

/**
 * Data type for the nested games query response, containing the games data with pagination information.
 */
export type NestedGamesQueryData = {
  games: {
    items: NestedGame[];
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/**
 * Data type for the nested game query response, containing the game data with scores and platforms.
 */
export type NestedGameQueryData = {
  game: NestedGame | null;
};

/**
 * Data type for game query response, containing the game data.
 */
export type GameQueryData = {
  game: Game | null;
};

/**
 * Data type for games query response, containing games and pagination data.
 */
export type GamesQueryData = {
  games: {
    items: Game[];
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/**
 * Data type for the create game mutation response, containing the created game data.
 */
export type CreateGameMutationData = {
  createGame: Game;
};

/**
 * Data type for the update game mutation response, containing the updated game data.
 */
export type UpdateGameMutationData = {
  updateGame: Game;
};

/**
 * Data type for the delete game mutation response, containing a message confirming deletion.
 */
export type DeleteGameMutationData = {
  deleteGame: {
    message: string;
  }
}