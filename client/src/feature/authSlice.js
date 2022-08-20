import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

// THUNK

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        GET_USER: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { GET_USER } = authSlice.actions;

export default authSlice.reducer;
