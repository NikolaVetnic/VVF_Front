import { put, take } from "redux-saga/effects";
import { SET_MODAL_DATA } from "./constants";
import { setModal } from "./slice";

export function* updateModal() {
    try {
        const { payload } = yield take(SET_MODAL_DATA);
        yield put(setModal(payload));
        if (payload.hasOwnProperty("callback")) {
            payload.callback();
        }
    } catch (error) {
        console.log("updateModal() : Error occurred");
    }
}

const modalSagas = [updateModal];

export default modalSagas;
