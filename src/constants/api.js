import axios from "axios";
import { BASE_URL } from "./index.js";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.request.use(
  function (config) {
    console.log("config -------->", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
