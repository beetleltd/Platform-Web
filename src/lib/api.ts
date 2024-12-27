import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";
export const BASE_URL = isDevelopment ? import.meta.env.VITE_API_URL : "/api";

console.log(BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-App-Name": "BLOOM_WEB",
  },
});

export default api;
