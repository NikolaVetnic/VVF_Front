import { isExpired } from "react-jwt";
import store from "../app/store";

export const isTokenValid = () => {
    const data = store.getState().user.data;
    return data !== undefined && !isExpired(data.token);
};
