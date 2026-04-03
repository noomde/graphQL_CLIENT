import { type CreateGameInput } from '../../games/types/inputType.ts';
import { type UpdateGameInput } from '../../games/types/inputType.ts';

/**
 * Maps the CreateGameInput data to the format expected by the backend API.
 *
 * @param input - The input data for creating a game.
 * @returns The mapped input data for the backend API.
 */
export function mapGameInputToBackend(input: CreateGameInput) {
  const backendInput = {
    ...input,
    genres: input.genres.join(', '),
  };
  return backendInput;
}


/**
 * Maps the UpdateGameInput data to the format expected by the backend API.
 *
 * @param input - The input data for updating a game.
 * @returns The mapped input data for the backend API.
 */
export function mapGameUpdateToBackend(input: UpdateGameInput) {
  return {
    ...input,
    genres: input.genres ? input.genres.join(', ') : undefined,
  };
}