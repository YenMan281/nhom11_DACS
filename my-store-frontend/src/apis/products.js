import request from "../axios"
import productsSlice from "../store/productsSlice";

export const getProducts = async(category) => {

    try {
        const response = await request({
            url: `/products/${category}`,
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllProducts = async(dispatch) => {


    try {
        const response = await request.get('/product');
        dispatch(productsSlice.actions.getAllProducts(response.data));
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const getProductDetail = async(category, productId) => {
    try {
        const response = await request({
            url: `/${category}/${productId}`
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}



export const deleteProduct = async(dispatch, id) => {
    dispatch(productsSlice.actions.deleteStart());

    try {
        const response = await request.delete(`/product/${id}`, )
        dispatch(productsSlice.actions.deleteSuccess(response.data));
    } catch (error) {
        dispatch(productsSlice.actions.deleteError)
    }
}
export const addProduct = async(dispatch, product, navigate) => {
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

};