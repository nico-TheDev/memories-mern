import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllPosts = () => {
    return async (dispatch, state) => {
        try {
            const { data } = await api.fetchPosts();
            console.log(data.data);
            dispatch(FETCH_ALL(data.data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const createPost = (newPost) => {
    return async (dispatch, state) => {
        try {
            const { data } = await api.createPost(newPost);
            dispatch(CREATE_POST(data));
        } catch (err) {
            console.log(err.message);
        }
    };
};

export const postSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        FETCH_ALL: (state, action) => {
            return action.payload;
        },
        CREATE_POST: (state) => {
            return [...state, state.payload];
        },
    },
});

export const { FETCH_ALL, CREATE_POST } = postSlice.actions;

export default postSlice.reducer;
