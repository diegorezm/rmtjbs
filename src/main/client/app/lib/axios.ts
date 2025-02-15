import axios, { AxiosError } from "axios";
import { AUTH_TOKEN_KEY } from "~/features/auth/constants";

const isDev = process.env.NODE_ENV === "development"
const API_URL = isDev ? "http://localhost:8080/api" : "/api"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const tokenExp = localStorage.getItem(AUTH_TOKEN_KEY + "-exp");
    if (token && tokenExp) {
      const expirationTime = new Date(tokenExp);
      const currentTime = new Date();
      if (currentTime > expirationTime) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY + "-exp");
        return Promise.reject(new Error("Your token expired. Please login again."));
      }
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return Promise.reject(new Error(error.response.data.message));
    }
    if (isDev) {
      console.error("AXIOS ERROR: ", error)
    }
    if (error instanceof AxiosError) {
      return Promise.reject(new Error(error.message))
    }
    return Promise.reject(new Error("An unexpected error occurred"));
  }
);
