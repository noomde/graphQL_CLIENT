import { type Rating } from "./ratingType.ts";
import { type Genre } from "./genresType.ts";

/**
 * Defines the input data for creating a new game.
 */
export type CreateGameInput = {
    title: string;
    releaseDate: string;
    rating: Rating;
    genres: Genre[];
    description: string;
    developer: string;
    publisher: string;
}

/**
 * Defines the input data for updating an existing game. All fields are optional to allow for partial updates.
 */
export type UpdateGameInput = {
    title?: string;
    releaseDate?: string;
    rating?: Rating;
    genres?: Genre[];
    description?: string;
    developer?: string;
    publisher?: string;
}