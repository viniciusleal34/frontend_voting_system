import axios from "axios";

import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://voto-banco.herokuapp.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
