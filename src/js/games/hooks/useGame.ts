import { useQuery } from '@apollo/client/react';

import {
  GET_GAMES_QUERY,
  GET_GAME_QUERY,
  GET_NESTED_GAMES_QUERY,
  GET_NESTED_GAME_QUERY,
} from '../graphql/gameOperations';
import {
  type GamesQueryData,
  type GameQueryData,
  type NestedGameQueryData,
  type NestedGamesQueryData,
} from '../types/responseType';

/**
 * A custom hook for querying a specific game.
 *
 * @param id - The id of the game to query.
 * @returns The game data.
 */
export function useGame(id: number) {
  const { data, loading, error } = useQuery<GameQueryData>(GET_GAME_QUERY, {
    variables: { id },
  });

  return {
    game: data?.game,
    loading,
    error,
  };
}

/**
 * A custom hook for querying all games.
 *
 * @returns The games data.
 */
export function useGames() {
  const { data, loading, error } = useQuery<GamesQueryData>(GET_GAMES_QUERY);

  return {
    games: data?.games,
    loading,
    error,
  };
}

/**
 * A custom hook for querying a specific game with nested data.
 *
 * @returns The game, score and platform data for a specific game.
 */
export function useNestedGame(id: number) {
  const { data, loading, error } = useQuery<NestedGameQueryData>(
    GET_NESTED_GAME_QUERY,
    {
      variables: { id },
    },
  );

  return {
    game: data?.game,
    loading,
    error,
  };
}

/**
 * A custom hook for querying all games with nested data.
 *
 * @returns The games, scores and platforms data for all games.
 */
export function useNestedGames() {
  const { data, loading, error } = useQuery<NestedGamesQueryData>(
    GET_NESTED_GAMES_QUERY,
  );

  return {
    games: data?.games,
    loading,
    error,
  };
}
