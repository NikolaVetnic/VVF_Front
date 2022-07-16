import { createSlice } from "@reduxjs/toolkit";
import * as updateStateFunctions from "./update-state-functions";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        selectedMovie: {
            id: localStorage.getItem("selectedMovieId"),
            title: localStorage.getItem("selectedMovieTitle"),
            description: localStorage.getItem("selectedMovieDescription"),
            imageUrl: localStorage.getItem("selectedMovieImageUrl"),
            genre: localStorage.getItem("selectedMovieGenre"),
            num_visits: localStorage.getItem("selectedMovieVisits"),
        },
    },
    reducers: {
        putFetchedMovies: updateStateFunctions.putFetchedMovies,
        selectMovies: updateStateFunctions.selectMovies,
        selectComments: updateStateFunctions.selectComments,
    },
});

const { actions, reducer: movieReducer } = movieSlice;

export const { putFetchedMovies, selectMovies, selectComments } = actions;
export default movieReducer;
