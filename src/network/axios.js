import axios from "axios";

let userToken = null;
let refreshToken = null;

if (typeof window !== "undefined") {
  // Perform sessionStorage action
  userToken = sessionStorage.getItem("user_token");
  refreshToken = sessionStorage.getItem("refresh_token");
}

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
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
    if (err?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      if (!!userToken) {
        await getRefreshToken(refreshToken, err);
      }
    } else {
      return Promise.reject(err);
    }
  }
);

const getRefreshToken = async (token, err) => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/auth/refresh-token`,
      undefined,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const { accessToken } = data?.tokens;
    const { refreshToken } = data?.tokens;
    sessionStorage.setItem("user_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return await instance(originalConfig);
  } catch (_error) {
    if (
      _error?.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.pathname = "/login";
      sessionStorage.removeItem("user_token");
      sessionStorage.removeItem("refresh_token");
    }
    return Promise.reject(err);
  }
};
