import express from "express";
/* import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  completeTask,
} from "../controllers/todoControllers.js"; */

import { createUsername } from "../controllers/todoControllers.js";

const router = express.Router();

router.post("/register", createUsername);

/* router.get("/", getAllTasks);

router.post("/create", createTask);

router.delete("/delete/:id", deleteTask);

router.put("/update/:id", updateTask);

router.patch("/complete/:id", completeTask); */

export default router;
