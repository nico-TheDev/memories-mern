import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./redux/postSlice";

export default configureStore({
    reducer: {
        posts: postReducer,
    },
});
