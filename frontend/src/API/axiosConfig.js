import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

export const createAuthTokenHeader = (token) => {
    API.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const deleteAuthTokenHeader = () => {
    delete API.defaults.headers.common["Authorization"];
};

export default API;