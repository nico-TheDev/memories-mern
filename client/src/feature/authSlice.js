import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

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
        try {
            const { data } = await api.signIn(formData);
            dispatch(SIGNIN(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const signup = (formData) => {
    return async (dispatch, state) => {
        try {
            const { data } = await api.signUp(formData);
            dispatch(SIGNUP(data));
        } catch (err) {
            console.log(err);
        }
    };
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        GET_USER: (state, action) => {
            const googleUser = jwtDecode(action.payload);
            console.log(googleUser);
            const { email, name, picture, sub: googleId } = googleUser;
            localStorage.setItem(
                "user",
                JSON.stringify({ email, name, picture, _id: googleId })
            );
            localStorage.setItem("token", JSON.stringify(action.payload));
            state.user = { email, name, picture, _id: googleId };
        },
        LOGOUT: (state) => {
            localStorage.clear();
            state.user = null;
        },
        SIGNIN: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.result));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return (state = {
                user: action.payload.result,
                token: action.payload.token,
            });
        },
        SIGNUP: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload.result));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return (state = {
                user: action.payload.result,
                token: action.payload.token,
            });
        },
    },
});

export const { GET_USER, LOGOUT, SIGNIN, SIGNUP } = authSlice.actions;

export default authSlice.reducer;
