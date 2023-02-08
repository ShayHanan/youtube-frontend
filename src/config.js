import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "https://shaytube-api.onrender.com/"
    baseURL: "http://localhost:8000/",
    withCredentials: true
});