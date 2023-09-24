import axios from "axios";

// Creating a new Axios instance with a default base URL
const api = axios.create({
  baseURL: "https://todoxpress.netlify.app/api",
});

export default api;
