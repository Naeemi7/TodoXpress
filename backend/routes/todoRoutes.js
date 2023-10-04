import express from "express";

import {
  createUsername,
  createTask,
  getAllTasksByUserId,
  deleteTask,
  updateTask,
  completeTask,
} from "../controllers/todoControllers.js";

const router = express.Router();

//User Route
router.post("/register", createUsername);

//Tasks Routes
router.patch("/task/add/:id", createTask);
router.get("/task/:id", getAllTasksByUserId);
router.patch("/task/delete/:userId/:taskId", deleteTask);
router.patch("/task/update/:userId/:taskId", updateTask);
router.patch("/task/complete/:userId/:taskId", completeTask);

export default router;
