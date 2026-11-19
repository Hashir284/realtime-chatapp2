import axios from "axios"

const api = axios.create({
    baseURL: window.location.href.split(":")[0] == "http" ? "http://localhost:4000/api" : "/api/v1",
    withCredentials: true,
});

export default api;