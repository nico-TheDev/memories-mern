import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts";

export default configureStore({
    reducer: {
        posts: postReducer,
    },
});
