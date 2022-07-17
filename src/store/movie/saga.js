import { call, put, take } from "redux-saga/effects";
import movieService from "../../services/api/movie-service";
import { loginModalDisplay } from "../modal/actions";
import { setModal } from "../modal/slice";
import {
    ADD_TO_FAVORITES,
    CREATE_MOVIE,
    FAVORITES_BY_USER,
    GET_COMMENTS,
    GET_MOVIES,
    INC_NUM_VISITS,
    POST_COMMENT,
    POST_REACTION,
    REMOVE_FROM_FAVORITES,
    SELECT_MOVIE,
    UPDATE_FAVORITE,
} from "./constants";
import {
    putFavoritesByUser,
    putFetchedMovies,
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

export function* displayMovie() {
    try {
        const { payload } = yield take(SELECT_MOVIE);
        const data = yield call(movieService.selectMovie, payload);
        yield put(selectMovies(data));
    } catch (error) {
        console.log("displayMovie() : Error occurred");
    }
}

export function* incNumVisits() {
    try {
        const { payload } = yield take(INC_NUM_VISITS);
        const data = yield call(movieService.incrementNumVisits, payload);
        yield put(selectMovies(data));
    } catch (error) {
        console.log("incNumVisits() : Error occurred");
    }
}

export function* displayComments() {
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

        const { movieId } = payload;
        const data = yield call(movieService.selectComments, movieId);

        yield put(selectComments(data));
    } catch (error) {
        console.log("storeMovie() : Error occurred");
    }
}

export function* storeReaction() {
    try {
        const { payload } = yield take(POST_REACTION);
        yield call(movieService.createReaction, payload);

        const { movieId } = payload;
        const data = yield call(movieService.selectMovie, movieId);

        yield put(selectMovies(data));
    } catch (error) {
        console.log("storeReaction() : Error occurred");
    }
}

export function* fetchFavoritesByUser() {
    try {
        const { payload } = yield take(FAVORITES_BY_USER);
        const data = yield call(movieService.selectFavoritesByUser, payload);
        yield put(putFavoritesByUser(data));
    } catch (error) {
        console.log("fetchFavoritesByUser() : Error occurred");
    }
}

export function* storeFavorite() {
    try {
        const { payload } = yield take(ADD_TO_FAVORITES);
        yield call(movieService.createFavorite, payload);
        console.log("storeFavorite() : Added to favorites");

        const { userId } = payload;
        const data = yield call(movieService.selectFavoritesByUser, userId);
        yield put(putFavoritesByUser(data));
    } catch (error) {
        console.log("storeFavorite() : Error occurred");
    }
}

export function* destroyFavorites() {
    try {
        const { payload } = yield take(REMOVE_FROM_FAVORITES);
        yield call(movieService.destroyFavorite, payload);

        const { userId } = payload;
        const data = yield call(movieService.selectFavoritesByUser, userId);
        yield put(putFavoritesByUser(data));
    } catch (error) {
        console.log("destroyFavorites() : Error occurred");
    }
}

export function* updateFavoriteWatched() {
    try {
        const { payload } = yield take(UPDATE_FAVORITE);
        yield call(movieService.updateFavorite, payload);

        const { userId } = payload;
        const data = yield call(movieService.selectFavoritesByUser, userId);
        yield put(putFavoritesByUser(data));
    } catch (error) {
        console.log("updateFavoriteWatched() : Error occurred");
    }
}

const movieSagas = [
    storeMovie,
    fetchMovies,
    displayMovie,
    incNumVisits,
    displayComments,
    storeComment,
    storeReaction,
    fetchFavoritesByUser,
    storeFavorite,
    destroyFavorites,
    updateFavoriteWatched,
];

export default movieSagas;
