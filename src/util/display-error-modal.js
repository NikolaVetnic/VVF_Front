import { put } from "redux-saga/effects";
import { loginModalDisplay } from "../store/modal/actions";
import { setModal } from "../store/modal/slice";

export function* displayErrorModal(error) {
    yield put(
        setModal({
            show: true,
            title: "Error",
            message: error.response.data.error,
            buttonCaption: "Close",
            onHide: loginModalDisplay,
        })
    );
}
