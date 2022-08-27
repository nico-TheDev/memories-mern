import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import toast from "react-hot-toast";

// THUNKS | ASYNC CODE

export const getAllPosts = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.fetchPosts();
            dispatch(FETCH_ALL(data.data));
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
};

export const getPostsBySearch = (searchQuery) => {
    return async (dispatch) => {
        try {
            const { data } = await api.fetchPostsBySearch(searchQuery);
            dispatch(FETCH_BY_SEARCH(data.posts));
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
};

export const createPost = (newPost) => {
    return async (dispatch) => {
        try {
            const loader = toast.loading("Creating Memoir");
            const { data } = await api.createPost(newPost);
            dispatch(CREATE_POST(data));
            toast.dismiss(loader);
            toast.success("Memoir Created");
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }
    };
};

export const updatePost = (id, updatedPost) => {
    return async (dispatch) => {
        try {
            const loader = toast.loading("Updating Memoir");
            const { data } = await api.updatePost(id, updatedPost);
            dispatch(UPDATE_POST(data));
            toast.dismiss(loader);
            toast.success("Memoir Updated");
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
};

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            const loader = toast.loading("Deleting Memoir");
            await api.deletePost(id);
            dispatch(DELETE_POST(id));
            toast.dismiss(loader);
            toast.success("Memoir Deleted");
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
};

export const likePost = (id) => {
    return async (dispatch) => {
        try {
            const loader = toast.loading("Liking Memoir");
            const { data: updatedPost } = await api.likePost(id);
            dispatch(UPDATE_POST(updatedPost));
            toast.dismiss(loader);
            toast.success("Liked Successful");
        } catch (err) {
            toast.error(err.message);
            console.log(err);
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
        FETCH_BY_SEARCH: (state, action) => {
            return action.payload;
        },
        CREATE_POST: (state, action) => {
            return [...state, action.payload];
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

export const {
    FETCH_ALL,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    FETCH_BY_SEARCH,
} = postSlice.actions;

export default postSlice.reducer;
