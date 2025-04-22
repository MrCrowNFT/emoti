import { jwtDecode } from "jwt-decode";
import { refreshAccessTokenRequest } from "../utils/token-refresh";

export const setupRequestInterceptor = (api) => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const decoded = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp - currentTime < 30) {
            const newToken = await refreshAccessTokenRequest();
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`;
              return config;
            }
          }
          config.headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          console.error("Token validation error:", error);
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
