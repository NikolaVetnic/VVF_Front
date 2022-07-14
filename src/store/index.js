import { configureStore } from "@reduxjs/toolkit";
import reducer from "./user/slice";

export default configureStore({
    reducer: { user: reducer },
});
