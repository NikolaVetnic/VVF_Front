import { call, put, take } from "redux-saga/effects";
import movieService from "../../services/api/movie-service";
import { loginModalDisplay } from "../modal/actions";
import { setModal } from "../modal/slice";
import { CREATE_MOVIE, GET_MOVIES, SELECT_MOVIE } from "./constants";
import { putFetchedMovies, selectMovies } from "./slice";

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

const movieSagas = [storeMovie, fetchMovies, displayMovie];

export default movieSagas;
