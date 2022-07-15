import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import authReducer from "./auth/slice";
import rootSaga from "./sagas-index";
import modalReducer from "./modal/slice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
];

const store = configureStore({
    reducer: { auth: authReducer, modal: modalReducer },
    middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
