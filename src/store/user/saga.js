import { call, put, takeEvery } from "redux-saga/effects";

import userService from "../../services/api/user-service";
import { login, logout } from "./slice";

export function* loginSaga(payload) {
    // prvo zove servis f-ju a zatim f-ju iz reducer-a is slice-a
    try {
        const loginUserData = yield call(userService.login, payload.values);
        yield put(login(loginUserData));
    } catch (err) {
        yield put({ type: "LOGIN_FAILED" });
    }
}

export function* logoutSaga() {
    try {
        yield call(userService.logout);
        yield put(logout());
    } catch (err) {
        yield put({ type: "LOGOUT_FAILED" });
    }
}

export default function* rootSaga() {
    yield takeEvery("LOGIN", loginSaga);
    yield takeEvery("LOGOUT", logoutSaga);
}
