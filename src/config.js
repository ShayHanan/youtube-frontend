import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://shaytube-api.onrender.com"
});