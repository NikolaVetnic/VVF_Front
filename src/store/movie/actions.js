import {
    CREATE_MOVIE,
    GET_COMMENTS,
    GET_MOVIES,
    INC_NUM_VISITS,
    POST_COMMENT,
    POST_REACTION,
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

export const getComments = (payload) => ({
    type: GET_COMMENTS,
    payload,
});

export const postComment = (payload) => ({
    type: POST_COMMENT,
    payload,
});

export const postReaction = (payload) => ({
    type: POST_REACTION,
    payload,
});
