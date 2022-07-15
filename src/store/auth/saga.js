import { call, put, take } from "redux-saga/effects";
import authService from "../../services/api/auth-service";
import { displayErrorModal } from "../../util/display-error-modal";
import { loginModalDisplay } from "../modal/actions";
import { setModal } from "../modal/slice";
import { LOGIN, REGISTER, TEST } from "./constants";
import { putAuthenticatedUser } from "./slice";

export function* testSaga() {
    while (true) {
        yield take(TEST);
        console.log("TEST_SAGA : action dispatched");
    }
}

export function* login() {
    try {
        const { payload } = yield take(LOGIN);
        const data = yield call(authService.login, payload);
        yield put(putAuthenticatedUser(data));
        if (payload.hasOwnProperty("callback")) {
            payload.callback();
        }
    } catch (error) {
        console.log("login() : Error occurred");
        yield call(displayErrorModal, error);
    }
}

export function* register() {
    try {
        const { payload } = yield take(REGISTER);
        yield call(authService.register, payload);
        yield put(
            setModal({
                show: true,
                title: "Success",
                message: "You will now be redirected to the Login page...",
                buttonCaption: "Close",
                onHide: loginModalDisplay,
                path: "/login",
            })
        );
        if (payload.hasOwnProperty("callback")) {
            payload.callback();
        }
    } catch (error) {
        console.log("register() : Error occurred");
        yield call(displayErrorModal, error);
    }
}

const authSagas = [testSaga, login, register];

export default authSagas;
