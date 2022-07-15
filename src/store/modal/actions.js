import { SET_MODAL_DATA } from "./constants";

export const loginModalDisplay = (payload) => ({
    type: SET_MODAL_DATA,
    payload,
});
