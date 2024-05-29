import request from "../axios"
import productsSlice from "../store/productsSlice";

export const getProducts = async (category) => {
    try {
        const response = await request({
            url: `/products/${category}`,
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllProducts = async () => {
    try {
        const response = await request.get('/product');
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const getProductDetail = async (category, productId) => {
    try {
        const response = await request({
            url: `/${category}/${productId}`
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (dispatch, product, navigate) => {
    dispatch(productsSlice.actions.addProductStart())
    try {
        const response = await request.post("/add-product", product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(productsSlice.actions.addProductSuccess());
        return response;
    } catch (error) {
        dispatch(productsSlice.actions.addProductError());
    }
}