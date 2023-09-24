import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

// Load .env file and connect it to process.env variable
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Parse the JSON body to req.body
app.use(express.json());

const corsOptions = {
  origin: ["https://todoxpress.netlify.app"], // Use your production URL
  methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
};

app.use(cors(corsOptions));

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
app.use("/api/tasks", todoRoutes);

// The server is listening
app.listen(port, () => {
  console.log("The server is listening on port", port);
});
