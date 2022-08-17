import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllPosts = () => {
    console.log("GET ALL POSTS");
    return async (dispatch, state) => {
        try {
            const { data } = await api.fetchPosts();
            console.log(data);
            dispatch(FETCH_ALL(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const postSlice = createSlice({
    name: "posts",
    initialState: { value: [] },
    reducers: {
        FETCH_ALL: (state) => {
            return state.payload;
        },
    },
});

export const { FETCH_ALL } = postSlice.actions;

export default postSlice.reducer;
