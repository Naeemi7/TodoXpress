import axios from "axios";

// Creating a new Axios instance with a default base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;