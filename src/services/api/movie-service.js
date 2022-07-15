import HttpBaseClient from "../http-base-client";

const ENDPOINTS = {
    CREATE: "api/movies/store",
    INDEX: "api/movies/index",
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
}

export default new MovieService();
