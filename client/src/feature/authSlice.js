import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

import * as api from "../api";

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: null,
};

// THUNK

export const signin = (formData) => {
    return async (dispatch, state) => {
        let loader;
        try {
            loader = toast.loading("Logging in");
            const { data } = await api.signIn(formData);
            dispatch(SIGNIN(data));
            toast.success("Login Successful");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        } finally {
            toast.dismiss(loader);
        }
    };
};

export const signup = (formData) => {
    return async (dispatch, state) => {
        let loader;
        try {
            loader = toast.loading("Creating Account");
            const { data } = await api.signUp(formData);
            dispatch(SIGNUP(data));
            toast.dismiss(loader);
            toast.success("Account Created");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        } finally {
            toast.dismiss(loader);
        }
    };
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        GET_USER: (state, action) => {
            const googleUser = jwtDecode(action.payload);
            // console.log(googleUser);
            const { email, name, picture, sub: googleId } = googleUser;
            localStorage.setItem(
                "user",
                JSON.stringify({ email, name, picture, _id: googleId })
            );
            localStorage.setItem("token", JSON.stringify(action.payload));
            return {
                ...state,
                user: { email, name, picture, _id: googleId },
                token: JSON.stringify(action.payload),
            };
        },
        LOGOUT: (state) => {
            localStorage.clear();
            return { user: null, token: null };
        },
        SIGNIN: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.result));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                user: action.payload.result,
                token: action.payload.token,
            };
        },
        SIGNUP: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.result));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                user: action.payload.result,
                token: action.payload.token,
            };
        },
    },
});

export const { GET_USER, LOGOUT, SIGNIN, SIGNUP } = authSlice.actions;

export default authSlice.reducer;
