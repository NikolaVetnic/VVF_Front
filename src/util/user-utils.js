import { isExpired } from "react-jwt";
import store from "../app/store";

export const isTokenValid = () => {
    const currentUser = store.getState().user.current;
    return !isExpired(currentUser.token);
};
