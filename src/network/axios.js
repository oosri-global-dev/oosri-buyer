import {
  getDataInCookie,
  storeDataInCookie,
} from "@/data-helpers/auth-session";
import axios from "axios";

let userToken = null;
let refreshToken = null;

if (typeof window !== "undefined") {
  // Perform sessionStorage action
  userToken = getDataInCookie("access_token");
  refreshToken = sessionStorage.getItem("refresh_token");
}

export const publicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: userToken || "",
  },
});

instance.interceptors.request.use(
  async (config) => {
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}` || null; // for Spring Boot back-end
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // Access Token was expired
    if (
      err?.response?.status === 401 &&
      !originalConfig._retry &&
      !!userToken
    ) {
      originalConfig._retry = true;

      await getRefreshToken(refreshToken, err);
    } else {
      return Promise.reject(err);
    }
  }
);

export const getRefreshToken = async (token, err) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/refresh-token`,
      {
        refreshToken: token,
      }
    );

    storeDataInCookie.setItem("access_token", data?.data?.body?.accessToken);
    // storeDataInCookie.setItem("refresh_token", data?.data?.body?.refreshToken);

    userToken = data?.data?.body?.accessToken;
    return await instance(err.config);
  } catch (_error) {
    if (
      _error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.pathname = "/login";
    }
  }
};
