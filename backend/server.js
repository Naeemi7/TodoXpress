import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

//imports for locating our directory (for deployment)
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url); // get the current file location of server.js
const __dirname = dirname(__filename); //extract directory from that location.

// Load .env file and connect it to process.env variable
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Parse the JSON body to req.body
app.use(express.json());

const corsOption = {
  origin: "*", // You might want to restrict this to specific origins in a production environment.
  methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
};

app.use(cors(corsOption));

// Connecting to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database connected! 😃");
  })
  .catch((error) => {
    console.log(error.message);
    console.log("🤨");
  });

// Register Routes
app.use("/api/users", todoRoutes);

//serve our files statically
app.use(express.static(path.join(__dirname, "../frontend/dist")));
//any other request made serve the index.html of our production build frontend.
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/frontend/dist/index.html");
});

// The server is listening
app.listen(port, () => {
  console.log("The server is listening on port", port);
});
