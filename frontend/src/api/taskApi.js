import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:3000/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default taskApi;
