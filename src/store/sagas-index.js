import { all, spawn, call } from "redux-saga/effects";
import authSagas from "./auth/saga";
import modalSagas from "./modal/saga";

export default function* rootSaga() {
    const sagas = [...authSagas, ...modalSagas];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
        )
    );
}
