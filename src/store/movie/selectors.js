const reducer = "movie";

export const moviesSelector = (state) => state[reducer].movies;
export const selectedMovieSelector = (state) => state[reducer].selectedMovie;