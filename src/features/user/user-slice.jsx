import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",

    initialState: initialState,

    reducers: {
        save: (state, action) => {
            state.data = action.payload;
        },
    },
});

const { actions, reducer } = userSlice;

export const { save } = actions;
export default reducer;
