import { type Rating } from "./ratingType.ts";
import { type Genre } from "./genresType.ts";

export type GameInput = {
    title: string;
    releaseDate: string;
    rating: Rating;
    genres: Genre[];
    description?: string;
    developer?: string;
    publisher?: string;
}