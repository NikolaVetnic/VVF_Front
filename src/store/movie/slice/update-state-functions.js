export const putFetchedMovies = (state, action) => ({
    ...state,
    movies: action.payload,
});

export const selectMovies = (state, action) => ({
    ...state,
    selectedMovie: action.payload,
});

export const selectComments = (state, action) => ({
    ...state,
    selectedComments: action.payload,
});
