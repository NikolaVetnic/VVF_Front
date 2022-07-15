import HttpBaseClient from "../http-base-client";

const ENDPOINTS = {
    CREATE: "api/movies/store",
    INDEX: "api/movies/index",
    SHOW: "api/movies/show/",
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

        return movie;
    };
}

export default new MovieService();
