import { addOrderError, addOrderStart, addOrderSuccses, getOrderError, getOrderStart, getOrderSuccess } from "../store/orderSlice"

export const orderProducts = async (cartOrder, dispatch, token, requestJWT) => {
    dispatch(addOrderStart())
    try {
        const response = requestJWT.post("/order", cartOrder, {
            headers: { token: `Bearer ${token}` }
        })
        dispatch(addOrderSuccses());
        return response
    } catch (error) {
        dispatch(addOrderError());
    }
}

export const getOrderHistory = async (dispatch, token, requestJWT) => {
    dispatch(getOrderStart())
    try {
        const response = await requestJWT.get("/user-order", {
            headers: {
                token: `Bearer ${token}`,
            }
        })
        dispatch(getOrderSuccess())
        return response
    } catch (error) {
        console.log(error);
        dispatch(getOrderError())
    }
}
export const getAllOrder = async (dispatch, token, requestJWT) => {
    try {
        const response = await requestJWT.get("/all-order", {
            headers: { token: `Bearer ${token}` }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}