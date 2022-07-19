const reducer = "movie";

export const moviesSelector = (state) => state[reducer].movies;
export const viewedSelector = (state) => state[reducer].viewed;
export const commentsSelector = (state) => state[reducer].comments;
export const favoritesSelector = (state) => state[reducer].favorites;
export const bestSelector = (state) => state[reducer].best;
export const relatedSelector = (state) => state[reducer].related;
