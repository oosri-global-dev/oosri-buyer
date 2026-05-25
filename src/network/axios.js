import {
  storeAuthTokens,
  clearAuthSession,
  getBuyerAccessToken,
  getBuyerRefreshToken,
} from "@/data-helpers/auth-session";
import axios from "axios";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.warn("NEXT_PUBLIC_BASE_URL is not defined. API requests may fail.");
}

export const publicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Bearer token on every authenticated request.
// This makes auth work on iOS Safari where ITP blocks cross-site httpOnly cookies
// from being stored via XHR responses — the first-party cookie is readable here.
instance.interceptors.request.use(
  (config) => {
    const token = getBuyerAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    // Access Token was expired
    if (
      err?.response?.status === 401 &&
      !originalConfig?._retry &&
      !originalConfig?.url?.includes("/auth/buyer/refresh-token")
    ) {
      originalConfig._retry = true;
      return getRefreshToken(originalConfig);
    }

    return Promise.reject(err);
  }
);

export const getRefreshToken = async (originalConfig) => {
  try {
    const refreshToken = getBuyerRefreshToken();
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/buyer/refresh-token`,
      refreshToken ? { refreshToken } : {},
      {
        withCredentials: true,
      }
    );

    const authPayload = data?.data?.body || {};
    storeAuthTokens(authPayload.accessToken, authPayload.refreshToken);

    return instance(originalConfig);
  } catch (_error) {
    clearAuthSession();

    if (
      typeof window !== "undefined" &&
      _error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.replace("/login");
    }

    return Promise.reject(_error);
  }
};
