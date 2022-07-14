import axios from "axios";
import store from "../app/store";

import { API_BASE_URL } from "../constants/api";

class HttpBaseClient {
    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
        });
        this.setInterceptor();
    }

    setInterceptor = () => {
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");

            if (!!token) {
                config.headers.Authorization = `${token}`;
            }

            return config;
        });
    };

    getApiClient = () => {
        return this.client;
    };
}

export default HttpBaseClient;
