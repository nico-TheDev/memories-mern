import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./feature/postSlice";
import authReducer from "./feature/authSlice";

export default configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
    },
});
