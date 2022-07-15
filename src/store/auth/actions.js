import { LOGIN, TEST, REGISTER } from "./constants";

export const testAuth = (payload) => ({
    type: TEST,
    payload,
});

export const login = (payload) => ({
    type: LOGIN,
    payload,
});

export const register = (payload) => ({
    type: REGISTER,
    payload,
});
