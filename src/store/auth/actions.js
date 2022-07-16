import { LOGIN, TEST, REGISTER, GET_USER } from "./constants";

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
