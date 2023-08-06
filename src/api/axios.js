// axios.js

import axios from "axios";

const BASE_URL = process.env.REACT_APP_RESTAPI_BASE_URL;

export default axios.create({ baseURL: BASE_URL });

export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});