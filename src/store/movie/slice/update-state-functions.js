export const putFetchedMovies = (state, action) => ({
    ...state,
    movies: action.payload,
});

export const selectMovies = (state, action) => ({
    ...state,
    viewed: action.payload,
});

export const selectComments = (state, action) => ({
    ...state,
    comments: action.payload,
});

export const putFavorites = (state, action) => ({
    ...state,
    favorites: action.payload,
});

export const putBestMovies = (state, action) => ({
    ...state,
    best: action.payload,
});

export const putRelatedMovies = (state, action) => ({
    ...state,
    related: action.payload,
});
