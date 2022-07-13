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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        save: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { actions, reducer } = userSlice;

export const { save } = actions;
export default reducer;
