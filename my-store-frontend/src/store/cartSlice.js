import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartProducts: [],
    cartTotal: 0,
    cartAmount: 0,

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartProducts.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.cartProducts.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(product => {
                // eslint-disable-next-line eqeqeq
                return product.id != action.payload
            })
        },
        clearCart: (state) => {
            state.cartProducts = [];
        },
        getCartTotal: (state, action) => {
            state.cartTotal = action.payload
        },
        getCartAmount: (state, action) => {
            state.cartAmount = action.payload
        }
    },
});

export const { addToCart, removeFromCart, clearCart, getCartTotal, getCartAmounts } = cartSlice.actions;

export default cartSlice;
