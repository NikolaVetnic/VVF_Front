import { call, put, take } from "redux-saga/effects";
import movieService from "../../services/api/movie-service";
import { loginModalDisplay } from "../modal/actions";
import { setModal } from "../modal/slice";
import {
    ADD_TO_FAVORITES,
    CREATE_MOVIE,
    FAVORITES_BY_USER,
    GET_BEST_MOVIES,
    GET_COMMENTS,
    GET_MOVIES,
    GET_RELATED_MOVIES,
    INC_NUM_VISITS,
    POST_COMMENT,
    POST_REACTION,
    REMOVE_FROM_FAVORITES,
    SELECT_MOVIE,
    UPDATE_FAVORITE,
} from "./constants";
import {
    putBestMovies,
    putFavorites,
    putFetchedMovies,
    putRelatedMovies,
    selectComments,
    selectMovies,
} from "./slice";

export function* storeMovie() {
    try {
        const { payload } = yield take(CREATE_MOVIE);
        yield call(movieService.createMovie, payload);
        yield put(
            setModal({
                show: true,
                title: "Success",
                message: `Movie ${payload.title} has been added!`,
                buttonCaption: "Close",
                onHide: loginModalDisplay,
            })
        );
    } catch (error) {
        console.log("storeMovie() : Error occurred");
    }
}

export function* fetchMovies() {
    try {
        yield take(GET_MOVIES);
        const data = yield call(movieService.getMovies);
        yield put(putFetchedMovies(data));
    } catch (error) {
        console.log("fetchMovies() : Error occurred");
    }
}

export function* fetchMovie() {
    try {
        const { payload } = yield take(SELECT_MOVIE);
        const data = yield call(movieService.viewMovie, payload);
        yield put(selectMovies(data));
    } catch (error) {
        console.log("displayMovie() : Error occurred");
    }
}

export function* increaseNumVisits() {
    try {
        const { payload } = yield take(INC_NUM_VISITS);
        yield call(movieService.incNumVisits, payload);
    } catch (error) {
        console.log("displayMovie() : Error occurred");
    }
}

export function* fetchComments() {
    try {
        const { payload } = yield take(GET_COMMENTS);
        const data = yield call(movieService.selectComments, payload);
        yield put(selectComments(data));
    } catch (error) {
        console.log("displayComments() : Error occurred");
    }
}

export function* storeComment() {
    try {
        const { payload } = yield take(POST_COMMENT);
        yield call(movieService.createComment, payload);

        const { movie_id } = payload;
        const data = yield call(movieService.selectComments, movie_id);

        yield put(selectComments(data));
    } catch (error) {
        console.log("storeMovie() : Error occurred");
    }
}

export function* storeReaction() {
    try {
        const { payload } = yield take(POST_REACTION);
        yield call(movieService.createReaction, payload);

        const { movie_id } = payload;
        const data = yield call(movieService.viewMovie, movie_id);

        yield put(selectMovies(data));
    } catch (error) {
        console.log("storeReaction() : Error occurred");
    }
}

export function* fetchFavorites() {
    try {
        const { payload } = yield take(FAVORITES_BY_USER);
        const data = yield call(movieService.selectFavorites, payload);
        yield put(putFavorites(data));
    } catch (error) {
        console.log("fetchFavorites() : Error occurred");
    }
}

export function* storeFavorite() {
    try {
        const { payload } = yield take(ADD_TO_FAVORITES);
        yield call(movieService.createFavorite, payload);

        const { user_id } = payload;
        const data = yield call(movieService.selectFavorites, user_id);
        yield put(putFavorites(data));
    } catch (error) {
        console.log("storeFavorite() : Error occurred");
    }
}

export function* destroyFavorite() {
    try {
        const { payload } = yield take(REMOVE_FROM_FAVORITES);
        yield call(movieService.destroyFavorite, payload);

        const { user_id } = payload;
        const data = yield call(movieService.selectFavorites, user_id);
        yield put(putFavorites(data));
    } catch (error) {
        console.log("destroyFavorites() : Error occurred");
    }
}

export function* updateFavoriteWatched() {
    try {
        const { payload } = yield take(UPDATE_FAVORITE);
        yield call(movieService.updateFavorite, payload);
    } catch (error) {
        console.log("updateFavoriteWatched() : Error occurred");
    }
}

export function* fetchBestMovies() {
    try {
        yield take(GET_BEST_MOVIES);
        const data = yield call(movieService.getBestMovies);
        yield put(putBestMovies(data));
    } catch (error) {
        console.log("fetchBestMovies() : Error occurred");
    }
}

export function* fetchRelatedMovies() {
    try {
        const { payload } = yield take(GET_RELATED_MOVIES);
        const data = yield call(movieService.getRelatedMovies, payload);
        yield put(putRelatedMovies(data));
    } catch (error) {
        console.log("fetchRelatedMovies() : Error occurred");
    }
}

const movieSagas = [
    storeMovie,
    fetchMovies,
    fetchMovie,
    increaseNumVisits,
    fetchComments,
    storeComment,
    storeReaction,
    fetchFavorites,
    storeFavorite,
    destroyFavorite,
    updateFavoriteWatched,
    fetchBestMovies,
    fetchRelatedMovies,
];

export default movieSagas;
