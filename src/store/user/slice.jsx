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
        login: (state, action) => {
            state.current = action.payload;
        },
        logout: (state) => {
            state.current = initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.current;
export default userSlice.reducer;
