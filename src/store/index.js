import { configureStore } from "@reduxjs/toolkit";
import reducer from "./auth/slice";

export default configureStore({
    reducer: { auth: reducer },
});
