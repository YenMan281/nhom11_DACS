import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    signup: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    logout: {
        isFetching: false,
        error: false,
        success: false,
    },

}
const authslice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginStart: (state, action) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginError: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        signupStart: (state, action) => {
            state.signup.isFetching = true;
        },
        signupSuccess: (state, action) => {
            state.signup.isFetching = false;
            state.signup.currentUser = action.payload;
            state.signup.error = false;
        },
        signupError: (state, action) => {
            state.signup.isFetching = false;
            state.signup.error = true;
        },
        logoutStart: (state, action) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.logout.isFetching = false;
            state.login.currentUser = action.payload;
            state.logout.error = false;
        },
        logoutError: (state, action) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    }
})
export default authslice;