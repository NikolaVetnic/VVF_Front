export const putFetchedMovies = (state, action) => ({
    ...state,
    movies: action.payload,
});
