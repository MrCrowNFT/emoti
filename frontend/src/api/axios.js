import axios from "axios";
import { setupRequestInterceptor } from "./interceptors/request";
import { setupResponseInterceptor } from "./interceptors/response";

const backendUrl = import.meta.env.BACKEND_URL;

const api = axios.create({
  baseUrl: backendUrl,
  withCredentials: true,
});
setupRequestInterceptor(api);
setupResponseInterceptor(api);

export default api;
