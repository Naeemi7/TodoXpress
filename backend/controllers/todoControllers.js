import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

/**
 * Create New Username
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createUsername = async (req, res) => {
  try {
    const { username } = req.body;

    const newUser = await User.create({
      username,
    });

    if (!username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please Enter a Username" });
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "New User created", newUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error.toString() });
  }
};

/* /**
 * Create a new Task
 * @param {*} req
 * @param {*} res
 */
/* export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await Todo.create({
      title,
      description,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "The task is created", newTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
}; */

/**
 * Get all the tasks
 * @param {*} req
 * @param {*} res
 * @returns
 */
/* export const getAllTasks = async (req, res) => {
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
}; */

/**
 * Delete the Task
 * @param {*} req
 * @param {*} res
 */
/* export const deleteTask = async (req, res) => {
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
}; */

/**
 * Update the task
 * @param {*} req
 * @param {*} res
 */
/* export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    //Find the task by id and update
    const updatedTask = await Todo.findByIdAndUpdate(
      id, // Use id directly as the first argument
      {
        title,
        description,
      },
      // Set this to true to updated document
      { new: true }
    );

    if (!updatedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "NOT FOUND" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "The task has been updated", updatedTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
 */
/**
 * Find the task by ID and change the completed status to true
 * @param {*} req
 * @param {*} res
 * @returns
 */
/* export const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    //Find the task by ID and change the complete = true
    const completedTask = await Todo.findByIdAndUpdate(
      id,
      {
        completed: true,
      },
      // Set this to true to updated document
      { new: true }
    );

    if (!completedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "NOT FOUND" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "The task has been completed", completeTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
 */
