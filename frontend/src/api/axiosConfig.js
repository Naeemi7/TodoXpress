import axios from "axios";

const apiConfig = {
  development: {
    baseURL: "http://localhost:3000/api",
  },
  production: {
    baseURL: "/api", // Assumes Netlify routes requests correctly
  },
};

// Determine the environment (development or production)
const environment = process.env.NODE_ENV || "development";

// Creating a new Axios instance with the appropriate base URL
const api = axios.create(apiConfig[environment]);

export default api;
