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
            likes: localStorage.getItem("selectedMovieLikes"),
            dislikes: localStorage.getItem("selectedMovieDislikes"),
        },
        selectedComments: [],
        favoritesByUser: [],
    },
    reducers: {
        putFetchedMovies: updateStateFunctions.putFetchedMovies,
        selectMovies: updateStateFunctions.selectMovies,
        selectComments: updateStateFunctions.selectComments,
        putFavoritesByUser: updateStateFunctions.putFavoritesByUser,
    },
});

const { actions, reducer: movieReducer } = movieSlice;

export const {
    putFetchedMovies,
    selectMovies,
    selectComments,
    putFavoritesByUser,
} = actions;
export default movieReducer;
