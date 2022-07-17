import HttpBaseClient from "../http-base-client";

const ENDPOINTS = {
    CREATE: "api/movies/store",
    INDEX: "api/movies/index",
    SHOW: "api/movies/show/",
    INC_NUM_VISITS: "api/movies/visit/",
    COMMENTS: "api/movies/comments/",
    CREATE_COMMENT: "api/comments/store",
    POST_REACTION: "api/reactions/store",
    FAVORITES_BY_USER: "api/favorites/index/user/",
    ADD_TO_FAVORITES: "api/favorites/store",
    REMOVE_FROM_FAVORITES: "api/favorites/destroy",
    UPDATE_FAVORITE: "api/favorites/update",
};

class MovieService extends HttpBaseClient {
    createMovie = async (movieData) => {
        const { title, description, imageUrl, genre } = movieData;

        const newMovie = this.getApiClient()
            .post(ENDPOINTS.CREATE, {
                title,
                description,
                imageUrl,
                genre,
            })
            .then((response) => {
                return response.data;
            });

        return newMovie;
    };

    getMovies = async () => {
        const movies = this.getApiClient()
            .get(ENDPOINTS.INDEX)
            .then((response) => response.data);

        return movies;
    };

    selectMovie = async (id) => {
        const movie = await this.getApiClient()
            .get(ENDPOINTS.SHOW + id)
            .then((response) => response.data);

        localStorage.setItem("selectedMovieId", movie.id);
        localStorage.setItem("selectedMovieTitle", movie.title);
        localStorage.setItem("selectedMovieDescription", movie.description);
        localStorage.setItem("selectedMovieImageUrl", movie.imageUrl);
        localStorage.setItem("selectedMovieGenre", movie.genre);
        localStorage.setItem("selectedMovieLikes", movie.likes);
        localStorage.setItem("selectedMovieDislikes", movie.dislikes);

        return movie;
    };

    incrementNumVisits = async (id) => {
        const movie = await this.getApiClient()
            .post(ENDPOINTS.INC_NUM_VISITS + id)
            .then((response) => response.data);

        localStorage.setItem("selectedMovieVisits", movie.numVisited);

        return movie;
    };

    selectComments = async (id) => {
        const comments = await this.getApiClient()
            .get(ENDPOINTS.COMMENTS + id)
            .then((response) => response.data);

        return comments;
    };

    createComment = async ({ userId, movieId, content }) => {
        const newComment = this.getApiClient()
            .post(ENDPOINTS.CREATE_COMMENT, {
                userId,
                movieId,
                content,
            })
            .then((response) => {
                return response.data;
            });

        return newComment;
    };

    createReaction = async ({ userId, movieId, reaction }) => {
        this.getApiClient()
            .post(ENDPOINTS.POST_REACTION, {
                userId,
                movieId,
                reaction,
            })
            .then((response) => {
                return response.data;
            });
    };

    selectFavoritesByUser = async (id) => {
        const favorites = await this.getApiClient()
            .get(ENDPOINTS.FAVORITES_BY_USER + id)
            .then((response) => response.data);

        return favorites;
    };

    createFavorite = async ({ userId, movieId, watched }) => {
        this.getApiClient()
            .post(ENDPOINTS.ADD_TO_FAVORITES, {
                userId,
                movieId,
                watched,
            })
            .then((response) => {
                return response.data;
            });
    };

    destroyFavorite = async ({ userId, movieId }) => {
        this.getApiClient()
            .post(ENDPOINTS.REMOVE_FROM_FAVORITES, {
                userId,
                movieId,
            })
            .then((response) => {
                return response.data;
            });
    };

    updateFavorite = async ({ userId, movieId }) => {
        this.getApiClient()
            .put(ENDPOINTS.UPDATE_FAVORITE, {
                userId,
                movieId,
            })
            .then((response) => {
                return response.data;
            });
    };
}

export default new MovieService();
