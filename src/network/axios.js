import {
  getDataInCookie,
  storeAuthTokens,
  clearAuthSession,
} from "@/data-helpers/auth-session";
import axios from "axios";

const getAccessToken = () =>
  typeof window !== "undefined" ? getDataInCookie("access_token") : null;

const getStoredRefreshToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    getDataInCookie("refresh_token") || window.sessionStorage.getItem("refresh_token")
  );
};

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.warn("NEXT_PUBLIC_BASE_URL is not defined. API requests may fail.");
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
  },
});

instance.interceptors.request.use(
  async (config) => {
    const userToken = getAccessToken();

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
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
      !!getAccessToken()
    ) {
      const refreshToken = getStoredRefreshToken();
      if (!refreshToken) {
        return Promise.reject(err);
      }

      originalConfig._retry = true;
      return getRefreshToken(refreshToken, originalConfig);
    }

    return Promise.reject(err);
  }
);

export const getRefreshToken = async (token, originalConfig) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/refresh-token`,
      {
        refreshToken: token,
      }
    );

    const authPayload = data?.data?.body || {};
    if (!authPayload?.accessToken) {
      throw new Error("No access token returned from refresh endpoint");
    }

    storeAuthTokens(authPayload.accessToken, authPayload.refreshToken || token);

    if (originalConfig?.headers) {
      originalConfig.headers.Authorization = `Bearer ${authPayload.accessToken}`;
    }

    return instance(originalConfig);
  } catch (_error) {
    clearAuthSession();

    if (
      typeof window !== "undefined" &&
      _error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.pathname = "/login";
    }

    return Promise.reject(_error);
  }
};
