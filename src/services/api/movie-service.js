import HttpBaseClient from "../http-base-client";

import {
    OMDB_API_BASE_URL,
    OMDB_API_KEY,
    CORS_ANYWHERE_API,
} from "../../constants/api";

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
    BEST: "api/movies/best",
    RELATED: "api/movies/genre/",
};

class MovieService extends HttpBaseClient {
    createMovie = async ({ title, description, image_url, genre }) => {
        const { data } = await this.getApiClient().post(ENDPOINTS.CREATE, {
            title,
            description,
            image_url,
            genre,
        });
        return data;
    };

    getMovies = async () => {
        const { data } = await this.getApiClient().get(ENDPOINTS.INDEX);
        localStorage.setItem("movies", JSON.stringify(data));
        return data;
    };

    viewMovie = async (id) => {
        const { data } = await this.getApiClient().get(ENDPOINTS.SHOW + id);
        localStorage.setItem("viewed", JSON.stringify(data));
        return data;
    };

    incNumVisits = async (id) => {
        await this.getApiClient().post(ENDPOINTS.INC_NUM_VISITS + id);
    };

    selectComments = async (id) => {
        const { data } = await this.getApiClient().get(ENDPOINTS.COMMENTS + id);
        localStorage.setItem("comments", JSON.stringify(data));
        return data;
    };

    createComment = async ({ user_id, movie_id, content }) => {
        this.getApiClient().post(ENDPOINTS.CREATE_COMMENT, {
            user_id,
            movie_id,
            content,
        });
    };

    createReaction = async ({ user_id, movie_id, reaction }) => {
        this.getApiClient().post(ENDPOINTS.POST_REACTION, {
            user_id,
            movie_id,
            reaction,
        });
    };

    selectFavorites = async (id) => {
        const { data } = await this.getApiClient().get(
            ENDPOINTS.FAVORITES_BY_USER + id
        );
        localStorage.setItem("favorites", JSON.stringify(data));
        return data;
    };

    createFavorite = async ({ user_id, movie_id, watched }) => {
        await this.getApiClient().post(ENDPOINTS.ADD_TO_FAVORITES, {
            user_id,
            movie_id,
            watched,
        });
    };

    destroyFavorite = async (id) => {
        await this.getApiClient().post(ENDPOINTS.REMOVE_FROM_FAVORITES, { id });
    };

    updateFavorite = async (id) => {
        await this.getApiClient().put(ENDPOINTS.UPDATE_FAVORITE, { id });
    };

    getBestMovies = async () => {
        const { data } = await this.getApiClient().get(ENDPOINTS.BEST);
        localStorage.setItem("best", JSON.stringify(data));
        return data;
    };

    getRelatedMovies = async (genre) => {
        const { data } = await this.getApiClient().get(
            ENDPOINTS.RELATED + genre
        );
        localStorage.setItem("related", JSON.stringify(data));
        return data;
    };

    getDataFromOMDB = async (searchQuery) => {
        const url = `${CORS_ANYWHERE_API}${OMDB_API_BASE_URL}?t=${searchQuery}&apikey=${OMDB_API_KEY}`;
        const { data } = await this.getApiClient().get(url);
        return data;
    };
}

export default new MovieService();
