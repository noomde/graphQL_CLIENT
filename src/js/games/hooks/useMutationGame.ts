import { useMutation } from '@apollo/client/react';
import {
  CREATE_GAME_MUTATION,
  UPDATE_GAME_MUTATION,
  DELETE_GAME_MUTATION,
} from '../graphql/gameOperations.ts';
import type { CreateGameInput, UpdateGameInput } from '../types/inputType.ts';
import type {
  CreateGameMutationData,
  DeleteGameMutationData,
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
    const mappedInput = mapCreateGameInputToBackend(input);

    const result = await mutate({
      variables: {
        title: mappedInput.title,
        genres: mappedInput.genres,
        releaseDate: mappedInput.releaseDate,
        rating: mappedInput.rating,
        description: mappedInput.description,
        developer: mappedInput.developer,
        publisher: mappedInput.publisher,
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

/**
 * A custom hook for updating a game.
 *
 * @returns The updated game data and mutation state.
 */
export function useUpdateGame() {
  const [mutate, { data, loading, error }] =
    useMutation<UpdateGameMutationData>(UPDATE_GAME_MUTATION);

  async function updateGame(id: number, input: UpdateGameInput) {
    const mappedInput = mapUpdateGameInputToBackend(input);

    const result = await mutate({
      variables: {
        id,
        title: mappedInput.title,
        genres: mappedInput.genres,
        releaseDate: mappedInput.releaseDate,
        rating: mappedInput.rating,
        description: mappedInput.description,
        developer: mappedInput.developer,
        publisher: mappedInput.publisher,
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

/**
 * A custom hook for deleting a game.
 *
 * @returns A function to delete a game and the mutation state.
 */
export function useDeleteGame() {
  const [mutate, { data, loading, error }] =
    useMutation<DeleteGameMutationData>(DELETE_GAME_MUTATION);

  async function deleteGame(id: number) {
    const result = await mutate({
      variables: {
        id,
      },
    });

    return result.data?.deleteGame ?? null;
  }

  return {
    deleteGame,
    game: data?.deleteGame ?? null,
    loading,
    error,
  };
}
