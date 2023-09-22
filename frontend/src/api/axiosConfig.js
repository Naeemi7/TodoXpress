import axios from "axios";

// Creating a new Axios instance with a default base URL
const api = axios.create({
  baseURL: "/.netlify/functions",
});

export default api;
