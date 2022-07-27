import { createSlice } from "@reduxjs/toolkit";
import * as updateStateFunctions from "./update-state-functions";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: JSON.parse(localStorage.getItem("movies")),
        viewed: !!JSON.parse(localStorage.getItem("viewed"))
            ? JSON.parse(localStorage.getItem("viewed"))
            : {},
        comments: JSON.parse(localStorage.getItem("comments")),
        favorites: JSON.parse(localStorage.getItem("favorites")),
        best: JSON.parse(localStorage.getItem("best")),
        related: JSON.parse(localStorage.getItem("related")),
    },
    reducers: {
        putFetchedMovies: updateStateFunctions.putFetchedMovies,
        selectMovie: updateStateFunctions.selectMovies,
        selectComments: updateStateFunctions.selectComments,
        putFavorites: updateStateFunctions.putFavorites,
        putBestMovies: updateStateFunctions.putBestMovies,
        putRelatedMovies: updateStateFunctions.putRelatedMovies,
        addCommentToStore: updateStateFunctions.addCommentToStore,
    },
});

const { actions, reducer: movieReducer } = movieSlice;

export const {
    putFetchedMovies,
    selectMovie,
    selectComments,
    putFavorites,
    putBestMovies,
    putRelatedMovies,
    addCommentToStore,
} = actions;
export default movieReducer;
