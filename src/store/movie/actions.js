import { CREATE_MOVIE } from "./constants";

export const createMovie = (payload) => ({
    type: CREATE_MOVIE,
    payload,
});
