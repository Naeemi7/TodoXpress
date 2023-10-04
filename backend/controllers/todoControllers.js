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

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found with the provided ID" });
    }

    //Get the tasks array from the user
    const tasks = user.tasks;

    return res.status(StatusCodes.OK).json({ message: "Tasks found", tasks });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", error });
  }
};

/**
 * Delete the Task based userId and TaskId
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

    // Check if userId is provided
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID" });
    }

    // Find the user by userId and update the tasks array using $pull
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          tasks: { _id: taskId }, // Use the taskId to identify the task to delete
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Task deleted successfully", updatedUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error", error });
  }
};

/**
 * Update the task based on userId and taskId
 * @param {*} req
 * @param {*} res
 */
export const updateTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { title, description } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID" });
    }

    // Find the task by userId and taskId and update it
    const updatedTask = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
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
/**
 * Find tasks by userId and taskId and check the status to done
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const completeTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please Provide User ID" });
    }

    // Find the task by userId and taskId, then change completed to true
    const completedTask = await User.findOneAndUpdate(
      {
        _id: userId,
        "tasks._id": taskId,
      },
      {
        $set: {
          "tasks.$.completed": true,
        },
      },
      { new: true }
    );

    if (!completedTask) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "The task has been completed", completedTask });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};
