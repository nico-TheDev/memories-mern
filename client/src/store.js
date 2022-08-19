import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./feature/postSlice";

export default configureStore({
    reducer: {
        posts: postReducer,
    },
});
