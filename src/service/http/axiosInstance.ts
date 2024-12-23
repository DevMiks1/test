import { useAuthenticationStore } from "@/store";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const userType = import.meta.env.VITE_USER_TYPE;

const authenticationStore = useAuthenticationStore();

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/owto-biz/api`,
  headers: {
    "Content-Type": "application/json",
    "x-user-type": userType,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || authenticationStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      authenticationStore.token = null;
    }
    console.error("Response Error:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
