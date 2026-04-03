import { useMutation } from '@apollo/client/react';
import { CREATE_GAME_MUTATION } from '../graphql/gameOperations.ts';
import { type CreateGameInput } from '../types/inputType.ts';
import { type CreateGameMutationData } from '../types/responseType.ts';
import { mapGameInputToBackend } from '../../generic/helpers/mapToBackend.ts';

/**
 * A custom hook for creating a game.
 *
 * @returns The created game data and mutation state.
 */
export function useCreateGame() {
  const [mutate, { data, loading, error }] = useMutation<CreateGameMutationData>(CREATE_GAME_MUTATION);

  async function createGame(input: CreateGameInput) {
    const result = await mutate({
      variables: {
        input: mapGameInputToBackend(input),
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

export 