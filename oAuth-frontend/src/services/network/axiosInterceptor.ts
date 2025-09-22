import environments from "@/common/environments";
import axios from "axios";
import { getCookie } from "cookies-next";

export const api = axios.create({
  baseURL: environments.API_BASE_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiServer = (ctx?: any) => {
  const token = ctx?.req?.headers?.cookie
  const instance = axios.create({
    baseURL: environments.API_BASE_URL || "http://localhost:8000",
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance; // 🔹 MUST return the Axios instance
}
