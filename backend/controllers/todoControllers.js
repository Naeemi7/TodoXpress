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

    //Check if the uusername already exists in database
    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "Username already exists", user: existedUser });
    }

    // Create a new user
    const newUser = await User.create({
      username,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/* /**
 * Create a new Task by User ID
 * @param {*} req
 * @param {*} res
 */
export const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const newTask = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          tasks: {
            title,
            description,
          },
        },
      },
      { new: true }
    );

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "New Task Created", newTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", error });
  }
};

/**
 * Get all the tasks by User ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllTasksByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await User.findById(id);

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID" });
    }

    return res.status(StatusCodes.OK).json({ message: "Tasks found", tasks });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", error });
  }
};

/**
 * Delete the Task
 * @param {*} req
 * @param {*} res
 */
/**
 * Delete a Task by Task ID for a specific User
 * @param {*} req
 * @param {*} res
 */
export const deleteTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    /*    if (!userId || !taskId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID and Task ID" });
    } */

    // Use the positional operator to remove the task by its _id for a specific user
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User or Task not found with the provided IDs" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Task deleted successfully", updatedUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", error: error.message });
  }
};

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
