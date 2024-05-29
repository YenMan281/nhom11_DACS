
import request from "../axios"
import authslice from "../store/authSlice"
import userSlice from "../store/userSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(authslice.actions.loginStart());
    try {
        const response = await request.post("/user/signin", user, {
            withCredentials: true,
        })
        dispatch(authslice.actions.loginSuccess(response.data));
        navigate("/")
        return response;
    } catch (error) {
        dispatch(authslice.actions.loginError())
    }
}
export const signupUser = async (user, dispatch, navigate) => {
    dispatch(authslice.actions.signupStart());
    try {
        const response = await request.post("/user/signup", user)
        dispatch(authslice.actions.signupSuccess(response.data));
        navigate("/login")
        return response;
    } catch (error) {
        dispatch(authslice.actions.signupError())
    }
}

export const logoutUser = async (dispatch) => {
    dispatch(authslice.actions.logoutStart())
    try {
        dispatch(authslice.actions.logoutSuccess(null))
    } catch (error) {
        dispatch(authslice.actions.logoutError())
    }
}

export const getAllUsers = async (token, dispatch, requestJWT) => {
    dispatch(userSlice.actions.getUsersStart())
    try {
        const response = await requestJWT.get("/user", {
            headers: { token: `Bearer ${token}` }
        })
        dispatch(userSlice.actions.getUsersSuccess(response.data));
        return response;
    } catch (error) {
        dispatch(userSlice.actions.getUsersError())
    }
}

export const deleteUser = async (token, dispatch, id, requestJWT) => {
    dispatch(userSlice.actions.deleteStart());
    try {
        const response = await requestJWT.get(`/user/delete/${id}`, {
            headers: {
                token: `Baerer ${token}`
            }
        })
        dispatch(userSlice.actions.deleteSuccess(response.data));
    } catch (error) {
        dispatch(userSlice.actions.deleteError)
    }
}