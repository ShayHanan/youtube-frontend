import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://shaytube-api.onrender.com/"
});