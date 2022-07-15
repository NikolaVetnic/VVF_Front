import { createSlice } from "@reduxjs/toolkit";

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
        putAuthenticatedUser: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { actions, reducer } = authSlice;

export const { putAuthenticatedUser } = actions;
export default reducer;
