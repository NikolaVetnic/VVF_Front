const reducer = "movie";

export const moviesSelector = (state) => state[reducer].movies;
export const selectedMovieSelector = (state) => state[reducer].selectedMovie;
export const selectedCommentsSelector = (state) =>
    state[reducer].selectedComments;
export const favoritesByUserSelector = (state) =>
    state[reducer].favoritesByUser;
