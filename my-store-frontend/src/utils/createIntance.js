import jwt_decode from "jwt-decode";
import request from "../axios";


const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}


const refreshToken = async () => {
    try {
        const response = await request.post("user/refreshToken", {}, config);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = request.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.token);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    token: data,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};