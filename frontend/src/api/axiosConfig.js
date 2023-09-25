import axios from "axios";

const api = axios.create({
  baseURL: "/.netlify/functions",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
