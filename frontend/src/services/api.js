// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Proxy is set up in package.json
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Return the response if no errors
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login page
      localStorage.removeItem("token");
      window.location.href = "/login"; // Adjust if your login route is different
    }
    return Promise.reject(error);
  }
);

export default api;
