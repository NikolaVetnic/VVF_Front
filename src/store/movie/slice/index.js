import { createSlice } from "@reduxjs/toolkit";
import * as updateStateFunctions from "./update-state-functions";

const movieSlice = createSlice({
    name: "movies",
    initialState: [],
    reducers: {
        putFetchedMovies: updateStateFunctions.putFetchedMovies,
    },
});

const { actions, reducer: movieReducer } = movieSlice;

export const { putFetchedMovies } = actions;
export default movieReducer;
