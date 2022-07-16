import {
    CREATE_MOVIE,
    GET_MOVIES,
    INC_NUM_VISITS,
    SELECT_MOVIE,
} from "./constants";

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

export const incNumVisits = (payload) => ({
    type: INC_NUM_VISITS,
    payload,
});
