import { useMutation } from '@apollo/client/react';
import {
  CREATE_GAME_MUTATION,
  UPDATE_GAME_MUTATION,
} from '../graphql/gameOperations.ts';
import type { CreateGameInput, UpdateGameInput } from '../types/inputType.ts';
import type {
  CreateGameMutationData,
  UpdateGameMutationData,
} from '../types/responseType.ts';
import {
  mapCreateGameInputToBackend,
  mapUpdateGameInputToBackend,
} from '../../generic/helpers/mapToBackend.ts';

/**
 * A custom hook for creating a game.
 *
 * @returns The created game data and mutation state.
 */
export function useCreateGame() {
  const [mutate, { data, loading, error }] =
    useMutation<CreateGameMutationData>(CREATE_GAME_MUTATION);

  async function createGame(input: CreateGameInput) {
    const result = await mutate({
      variables: {
        input: mapCreateGameInputToBackend(input),
      },
    });

    return result.data?.createGame ?? null;
  }

  return {
    createGame,
    game: data?.createGame ?? null,
    loading,
    error,
  };
}

export function useUpdateGame() {
  const [mutate, { data, loading, error }] =
    useMutation<UpdateGameMutationData>(UPDATE_GAME_MUTATION);

  async function updateGame(id: number, input: UpdateGameInput) {
    const result = await mutate({
      variables: {
        id,
        input: mapUpdateGameInputToBackend(input),
      },
    });

    return result.data?.updateGame ?? null;
  }

  return {
    updateGame,
    game: data?.updateGame ?? null,
    loading,
    error,
  };
}
