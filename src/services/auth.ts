import { axs } from "./axiosAPI";
import { GET_TOKEN_URL, LOGIN_PAGE } from "../common/constants";
import { AuthData } from "../common/types";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () => {
  const storedUser = localStorage.getItem("user");
  return isBrowser() && storedUser ? JSON.parse(storedUser) : {};
};

const setUser = (accessToken: string) => {
  const decodedToken = decodeJWT(accessToken);
  localStorage.setItem("user", JSON.stringify(decodedToken.user));
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axs.post<AuthData>(GET_TOKEN_URL, {
      username: username,
      password: password,
    });
    axs.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    setUser(response.data.access);
  } catch (error: any) {
    throw error;
  }
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.name && !isTokenExpired(localStorage.getItem("access_token"));
};

export const logout = () => {
  localStorage.clear();
  window.location.href = LOGIN_PAGE;
};

export const isTokenExpired = (token: string | null) => {
  if (token) {
    const decodedJWT = decodeJWT(token);
    return decodedJWT.exp * 1000 <= Date.now();
  }
  return true;
};

const decodeJWT = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
