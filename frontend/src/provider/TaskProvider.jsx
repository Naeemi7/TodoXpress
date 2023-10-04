import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

/**
 * Task Provider
 * @param {*} param0
 * @returns
 */
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [error, setError] = useState(null);

  /**
   * Function to fetch all the tasks
   */
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get(`/task/${userId}`);

        if (Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
          setError(null); // Clear any previous errors
        } else {
          setError("Data structure from the server is incorrect");
        }
      } catch (error) {
        setError("Error happened fetching data: " + error.message);
      }
    };

    if (userId) {
      fetchAllTasks();
    }
  }, [userId]);

  /**
   * Function to create username
   * @param {*} username
   * @returns
   */
  const createUsername = async (username) => {
    try {
      setError(null);

      const response = await api.post("/register", { username });

      if (
        response.status === 200 &&
        response.data.message === "Username already exists"
      ) {
        setError("Username already exists");
        setUserName(response.data.user.username);
        setUserId(response.data.user._id);

        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userName", response.data.user.username);

        return { message: 200 };
      } else {
        setUserName(response.data.user.username);
        setUserId(response.data.user._id);

        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userName", response.data.user.username);

        return { message: 201 };
      }
    } catch (error) {
      console.error("Error occurred while creating a new username:", error);
      setError("Error occurred while creating a new username.");
      return { error: "Error occurred while creating a new username" };
    }
  };

  /**
   * Function to add task based on the user ID
   * @param {*} taskName
   * @param {*} taskDescription
   */
  const addTask = async (taskName, taskDescription) => {
    try {
      const newTask = {
        title: taskName,
        description: taskDescription,
      };

      await api.patch(`/task/add/${userId}`, newTask, {});

      refreshTasks();
    } catch (error) {
      setError("Error occurred while creating a new task: " + error.message);
    }
  };

  /**
   * Function to delete the task based taskid and userID
   * @param {*} taskId
   */

  const deleteTask = async (taskId) => {
    try {
      await api.patch(`/task/delete/${userId}/${taskId}`);

      refreshTasks();
    } catch (error) {
      setError("Error happened deleting the task: " + error.message);
    }
  };

  /**
   * Function to update the tasks based User ID and TaskID
   * @param {*} taskId
   * @param {*} updatedTask
   */

  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.patch(`/task/update/${userId}/${taskId}`, updatedTask);

      refreshTasks();
    } catch (error) {
      setError("Error happened updating the task: " + error.message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await api.patch(`/task/complete/${taskId}`);

      refreshTasks();
    } catch (error) {
      setError("Error happened marking the task as done: " + error.message);
    }
  };

  const refreshTasks = async () => {
    try {
      const response = await api.get(`/task/${userId}`);
      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
        setError(null);
      } else {
        setError("Data structure from the server is incorrect during refresh");
      }
    } catch (error) {
      setError("Error happened fetching data during refresh: " + error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        completeTask,
        createUsername,
        userName,
        userId,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Validate that children is a valid React node
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskProvider;
