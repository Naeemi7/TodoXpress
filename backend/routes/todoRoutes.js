import express from "express";
import { createTask, getAllTasks } from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/create", createTask);

export default router;
