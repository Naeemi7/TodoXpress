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

/**
 * Delete the Task
 * @param {*} req
 * @param {*} res
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Use req.params to get the task ID from the URL

    // Find and delete the task by ID
    const deletedTask = await Todo.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "The task has been deleted", deletedTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
