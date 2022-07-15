import { createSlice } from "@reduxjs/toolkit";
import * as updateStateFunctions from "./update-state-functions";

const initialState = {
    current: {
        token: localStorage.getItem("token"),
        data: {
            id: localStorage.getItem("id"),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        },
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        putAuthenticatedUser: updateStateFunctions.putAuthenticatedUser,
    },
});

const { actions, reducer: authReducer } = authSlice;

export const { putAuthenticatedUser } = actions;
export default authReducer;
