export const putFetchedMovies = (state, action) => ({
    ...state,
    movies: action.payload,
});

export const selectMovies = (state, action) => ({
    ...state,
    selectedMovie: action.payload,
});
