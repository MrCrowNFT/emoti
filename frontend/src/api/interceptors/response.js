import axios from "axios";
import { refreshAccessTokenRequest } from "../utils/token-refresh";

export const setupResponseInterceptor = (api)=>{
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
    
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
    
            try {
              const newToken = await refreshAccessTokenRequest();
              if (newToken) {
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest);
              }
            } catch (refreshError) {
              console.error("Authentication failed:", refreshError);
    
              window.location.href = "/login";
            }
          }
    
          return Promise.reject(error);
        }
      );
}

