import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import { default as userSlice } from "./user/slice";
import { default as userSaga } from "./user/saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: { user: userSlice },
    middleware,
});

sagaMiddleware.run(userSaga);

export default store;
