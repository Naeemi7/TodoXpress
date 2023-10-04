import express from "express";

import {
  createUsername,
  createTask,
  getAllTasksByUserId,
  deleteTask,
} from "../controllers/todoControllers.js";

const router = express.Router();

//User Route
router.post("/register", createUsername);

//Tasks Routes
router.patch("/task/add/:id", createTask);
router.get("/task/:id", getAllTasksByUserId);
router.patch("/task/delete/:userId/:taskId", deleteTask);

/* router.get("/", getAllTasks);

router.post("/create", createTask);

router.delete("/delete/:id", deleteTask);

router.put("/update/:id", updateTask);

router.patch("/complete/:id", completeTask); */

export default router;
