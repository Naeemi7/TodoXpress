import axios from "axios";

// Creating a new Axios instance with a default base URL and headers
const api = axios.create({
  baseURL: "/.netlify/functions",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
