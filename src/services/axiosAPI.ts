import axios from "axios";
import { isTokenExpired, logout } from "./auth";
import { API_URL, TOKEN_REFRESH_URL } from "../common/constants";
import { AuthData } from "../common/types";

// DEFAULT AXIOS HEADERS
axios.defaults.baseURL = `${API_URL}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

export let axs = axios.create({
  timeout: 1000000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axs.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const access_token = localStorage.getItem("access_token");
    if (access_token && isTokenExpired(access_token)) {
      if (403 === error.response.status && "Forbidden" === error.response.statusText) {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken && isTokenExpired(refreshToken)) {
          logout();
          // ERROR EXPIRED TOKEN AND REFRESH TOKEN
          console.log("EXPIRED BOTH");
          return Promise.reject(error);
        } else {
          try {
            const response = await axs.post<AuthData>(TOKEN_REFRESH_URL, {
              refresh: refreshToken,
            });
            localStorage.setItem("auth_token", response.data.access);
            originalRequest.__isRetryRequest = true;
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return axs(originalRequest);
          } catch (e) {
            // ERROR FETCHING REFRESH TOKEN
            console.log("EXPIRED REFRESH");
            return Promise.reject(e);
          }
        }
      }
    }
    // ANY OTHRE TYPE OF ERRORS
    console.log("NORMAL ERR");
    return Promise.reject(error);
  }
);
