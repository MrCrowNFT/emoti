import api from "../axios.js";
import refreshAccessTokenRequest from "../utils/token-refresh.js";

export const signupRequest = async (signup) => {
  console.log("Sending signup request...");
  const res = await api.post("/auth/signup", signup);
  console.log("New account created succesfully.\nRedirecting to login");
  return res.data;
};

export const loginRequest = async (login) => {
  console.log("Sending login request...");
  const res = await api.post("/auth/login", login);
  if (res.data && res.data.accessToken) {
    localStorage.setItem("accessToken", res.data.accessToken);
    console.log("Login successful");
  }
  return res.data;
};

export { refreshAccessTokenRequest as refreshAccessToken };

export const logoutRequest = async () => {
  console.log("Sending logout request...");
  const res = await api.post("/auth/logout");
  return res.data;
};
