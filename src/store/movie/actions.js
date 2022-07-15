import { CREATE_MOVIE, GET_MOVIES } from "./constants";

export const createMovie = (payload) => ({
    type: CREATE_MOVIE,
    payload,
});

export const getMovies = () => ({
    type: GET_MOVIES,
});
