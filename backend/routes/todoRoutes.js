import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/create", createTask);

router.delete("/delete/:id", deleteTask);

router.put("/update/:id", updateTask);

export default router;
