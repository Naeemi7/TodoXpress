import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

//Load .eng file connects into process.env variable
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Parse the Json body to req.body
app.use(express.json());

// Allow requests from your Netlify-hosted frontend
const corsOptions = {
  origin: "https://todoxpress.netlify.app", // Replace with your Netlify frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you need to send cookies
};

app.use(cors(corsOption));

// Conneting to mongoDB
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

//Register Routes
app.use("/api/tasks", todoRoutes);

//The server is listen
app.listen(port, () => {
  console.log("The server is listening on port", port);
});
