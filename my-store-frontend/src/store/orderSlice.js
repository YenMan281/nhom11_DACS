import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    addOrder: {
        isFetching: false,
        error: false,
        success: false
    },
    getOrder: {
        listOrder: [],
        success: false,
        error: false,
        isFetching: false
    }
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addOrderStart: (state) => {
            state.addOrder.isFetching = true;
        },
        addOrderSuccses: (state) => {
            state.addOrder.isFetching = false;
            state.addOrder.success = true;
        },
        addOrderError: (state) => {
            state.addOrder.isFetching = false;
            state.addOrder.error = true;
        },
        getOrderStart: (state) => {
            state.getOrder.isFetching = true;
        },
        getOrderSuccess: (state, action) => {
            state.getOrder.isFetching = false;
            state.getOrder.listOrder = action.payload;
            state.addOrder.success = true;
        },
        getOrderError: (state) => {
            state.getOrder.isFetching = false;
            state.getOrder.error = true;
        },
    }
})

export const { addOrderStart, addOrderSuccses, addOrderError, getOrderStart, getOrderSuccess, getOrderError } = orderSlice.actions;

export default orderSlice;