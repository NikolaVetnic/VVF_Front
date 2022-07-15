import { call, put, take } from "redux-saga/effects";
import movieService from "../../services/api/movie-service";
import { loginModalDisplay } from "../modal/actions";
import { setModal } from "../modal/slice";
import { CREATE_MOVIE, GET_MOVIES } from "./constants";
import { putFetchedMovies } from "./slice";

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

const movieSagas = [storeMovie, fetchMovies];

export default movieSagas;
