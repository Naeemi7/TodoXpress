import { StatusCodes } from "http-status-codes";
import Todo from "../models/Todo.js";

/**
 * Create a new Task
 * @param {*} req
 * @param {*} res
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const newTask = await Todo.create({
      title,
      description,
      dueDate,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "The task is created", newTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

/**
 * Get all the tasks
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find();

    if (!tasks) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Tasks not found" });
    }

    return res.status(StatusCodes.OK).json({ message: "Tasks found", tasks });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
