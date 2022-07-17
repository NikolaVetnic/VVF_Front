import {
    ADD_TO_FAVORITES,
    CREATE_MOVIE,
    FAVORITES_BY_USER,
    GET_COMMENTS,
    GET_MOVIES,
    INC_NUM_VISITS,
    POST_COMMENT,
    POST_REACTION,
    REMOVE_FROM_FAVORITES,
    SELECT_MOVIE,
    UPDATE_FAVORITE,
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

export const getFavoritesByUser = (payload) => ({
    type: FAVORITES_BY_USER,
    payload,
});

export const addToFavorites = (payload) => ({
    type: ADD_TO_FAVORITES,
    payload,
});

export const removeFromFavorites = (payload) => ({
    type: REMOVE_FROM_FAVORITES,
    payload,
});

export const updateFavorite = (payload) => ({
    type: UPDATE_FAVORITE,
    payload,
});
