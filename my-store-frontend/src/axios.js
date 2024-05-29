import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_SEVER_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default request;