import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addProduct: {
        isFetching: false,
        error: false,
        success: false,
    },
    getProducts: {
        category: "mens",
        currenPath: "mens",
        currenProducts: [],
        products: [],
    },
    getProductId: {
        prodId: ""
    },
    getCategory: {
        currentCategory: ""
    }
}

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProductStart: (state) => {
            state.addProduct.isFetching = true;
        },
        addProductSuccess: (state) => {
            state.addProduct.isFetching = false;
            state.addProduct.success = false;
        },
        addProductError: (state) => {
            state.addProduct.isFetching = false;
            state.addProduct.error = true;
        },
        getProducts: (state, action) => {
            state.getProducts.category = action.payload;
        },
        getAllProducts: (state, action) => {
            state.getProducts.products = action.payload;
        },
        getProductId: (state, action) => {
            state.getProductId.prodId = action.payload;
        },
        setCrurrentPath: (state, action) => {
            state.getProducts.currenPath = action.payload;
        },
        setCurrenProducts: (state, action) => {
            state.getProducts.currenProducts = action.payload;
        },
    }
})

export default productsSlice;