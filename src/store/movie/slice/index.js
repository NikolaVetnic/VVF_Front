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
        },
    },
    reducers: {
        putFetchedMovies: updateStateFunctions.putFetchedMovies,
        selectMovies: updateStateFunctions.selectMovies,
    },
});

const { actions, reducer: movieReducer } = movieSlice;

export const { putFetchedMovies, selectMovies } = actions;
export default movieReducer;
