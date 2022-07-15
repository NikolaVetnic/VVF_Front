import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_USER_DATA } from "../../../constants";
import * as updateStateFunctions from "./update-state-functions";

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_USER_DATA,
    reducers: {
        putAuthenticatedUser: updateStateFunctions.putAuthenticatedUser,
    },
});

const { actions, reducer: authReducer } = authSlice;

export const { putAuthenticatedUser } = actions;
export default authReducer;
