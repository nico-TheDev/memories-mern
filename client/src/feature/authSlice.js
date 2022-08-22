import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
};

// THUNK

export const signin = (formData) => {
    return async (dispatch, state) => {
        try {
            dispatch(SIGNIN(formData));
        } catch (err) {
            console.log(err);
        }
    };
};

export const signup = (formData) => {
    return async (dispatch, state) => {
        try {
            dispatch(SIGNUP(formData));
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
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        LOGOUT: (state) => {
            localStorage.clear();
            state.user = null;
        },
        SIGNIN: (state) => {},
        SIGNUP: (state) => {},
    },
});

export const { GET_USER, LOGOUT, SIGNIN, SIGNUP } = authSlice.actions;

export default authSlice.reducer;
