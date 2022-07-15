import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_MODAL_DATA } from "../../../constants";
import * as updateStateFunctions from "./update-state-functions";

const modalSlice = createSlice({
    name: "modal",
    initialState: { data: INITIAL_MODAL_DATA },
    reducers: {
        setModal: updateStateFunctions.setModal,
    },
});

const { actions, reducer: modalReducer } = modalSlice;

export const { setModal } = actions;
export default modalReducer;
