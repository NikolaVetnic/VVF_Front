import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import authReducer from "./auth/slice";
import rootSaga from "./sagas-index";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: { auth: authReducer },
    middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
