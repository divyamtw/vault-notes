import axios from "axios";
const base_url = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let accessToken = null;

export const setAxiosAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
