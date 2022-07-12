import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/user/user-slice";

export default configureStore({
    reducer: { user: reducer },
});
