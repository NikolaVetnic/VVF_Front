import { CREATE_MOVIE, GET_MOVIES, SELECT_MOVIE } from "./constants";

export const createMovie = (payload) => ({
    type: CREATE_MOVIE,
    payload,
});

export const getMovies = () => ({
    type: GET_MOVIES,
});

export const selectMovie = (payload) => ({
    type: SELECT_MOVIE,
    payload,
});
