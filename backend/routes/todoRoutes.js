import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/create", createTask);

router.delete("/delete/:id", deleteTask);

export default router;
