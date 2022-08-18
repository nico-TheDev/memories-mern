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

export const updatePost = (id, updatedPost) => {
    return async (dispatch, state) => {
        try {
            const { data } = await api.updatePost(id, updatedPost);
            dispatch(UPDATE_POST(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const deletePost = (id) => {
    return async (dispatch, state) => {
        try {
            await api.deletePost(id);
            dispatch(DELETE_POST(id));
        } catch (err) {}
    };
};

export const likePost = (id) => {
    return async (dispatch, state) => {
        try {
            const { data: updatedPost } = await api.likePost(id);
            console.log(updatedPost);
            dispatch(UPDATE_POST(updatedPost));
        } catch (err) {}
    };
};

export const postSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        FETCH_ALL: (_, action) => {
            return action.payload;
        },
        CREATE_POST: (state) => {
            return [...state, state.payload];
        },
        UPDATE_POST: (state, action) => {
            return state.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
        },
        DELETE_POST: (state, action) => {
            return state.filter((post) => post._id !== action.payload);
        },
    },
});

export const { FETCH_ALL, CREATE_POST, UPDATE_POST, DELETE_POST } =
    postSlice.actions;

export default postSlice.reducer;
