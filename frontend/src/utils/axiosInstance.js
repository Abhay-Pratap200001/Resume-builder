// axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./apiPath.js";

// Create an axios instance with common settings
const axiosInstance = axios.create({
  baseURL: BASE_URL, // backend API base URL
  timeout: 10000, // request timeout (10s)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor → runs before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    // If a token exists, attach it to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor → handles errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // just return the response if successful
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // If unauthorized, redirect to login
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server Error");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
