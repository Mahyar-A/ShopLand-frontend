import axios from "axios";

const BASE_URL = "http://localhost:5139";

export const ACCESS_TOKEN_KEY = "sl_at";
export const REFRESH_TOKEN_KEY = "sl_rt";

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
