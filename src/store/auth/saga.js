import { take } from "redux-saga/effects";
import { TEST } from "./constants";

export function* testSaga() {
    while (true) {
        console.log("TEST_SAGA : start");
        const action = yield take(TEST);
        console.log("TEST_SAGA : logged in as " + action.payload);
    }
}

const authSagas = [testSaga];

export default authSagas;
