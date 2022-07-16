import HttpBaseClient from "../http-base-client";

const ENDPOINTS = {
    CREATE: "api/movies/store",
    INDEX: "api/movies/index",
    SHOW: "api/movies/show/",
    INC_NUM_VISITS: "api/movies/visit/",
    COMMENTS: "api/movies/comments/",
    CREATE_COMMENT: "api/comments/store",
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
        localStorage.setItem("selectedMovieVisits", movie.numVisited);

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
}

export default new MovieService();
