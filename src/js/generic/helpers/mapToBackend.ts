import type { CreateGameInput, UpdateGameInput } from '../../games/types/inputType.ts';

/**
 * Maps the CreateGameInput or UpdateGameInput to the format expected by the backend.
 *
 * @param genres - An array of genre strings.
 * @returns A comma-separated string of genres or undefined if genres is not provided.
 */
export function formatGenre(genres?: string[]) {
  return genres ? genres.join(', ') : undefined;
}

/**
 * Maps the CreateGameInput to the format expected by the backend API.
 *
 * @param input - The input data for creating a game.
 * @returns The mapped input data for the backend API.
 */
export function mapCreateGameInputToBackend(input: CreateGameInput) {
  return {
    ...input,
    genres: formatGenre(input.genres)!,
  };
}

/**
 * Maps the UpdateGameInput to the format expected by the backend API.
 *
 * @param input - The input data for updating a game.
 * @returns The mapped input data for the backend API.
 */
export function mapUpdateGameInputToBackend(input: UpdateGameInput) {
  return {
    ...input,
    genres: formatGenre(input.genres)!,
  };
}