import axios from "axios";

axios.interceptors.request.use(function (config) {
  const tokennn = localStorage.getItem("token");
  const header_token = "Bearer ";
  const token = header_token + tokennn;
  if (token) {
    config.headers.Authorization = token;
    config.headers["If-None-Match"] = "";
  }
  return config;
});
