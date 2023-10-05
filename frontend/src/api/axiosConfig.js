import axios from "axios";
import process from "process";

const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000/api/users"
    : "/api/users";
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(process.env.NODE_ENV);
export default api;
