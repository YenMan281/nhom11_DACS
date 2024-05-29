import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {
        allUsers: null,
        isFetching: false,
        error: false,
    },
    delete: {
        isFetching: false,
        error: false,
        success: "",
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersError: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteStart: (state) => {
            state.delete.isFetching = true;
        },
        deleteSuccess: (state, action) => {
            state.delete.isFetching = false;
            state.delete.success = action.payload;
            state.delete.error = false;
        },
        deleteError: (state) => {
            state.delete.isFetching = false;
            state.delete.error = true;
        }
    }
})

export default userSlice;