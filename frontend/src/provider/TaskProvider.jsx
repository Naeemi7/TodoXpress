import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get("/tasks");

        if (response.data && Array.isArray(response.data.tasks)) {
          // Check if response.data.tasks is an array
          setTasks(response.data.tasks);
          setError(null); // Clear any previous errors
        } else {
          setError("Data structure from the server is incorrect");
        }
      } catch (error) {
        setError("Error happened fetching data: " + error.message);
      }
    };

    fetchAllTasks();
  }, []);

  const createUsername = async (username) => {
    try {
      const newUser = {
        username: username,
      };

      const response = await api.post("/users/register", newUser);
      setUser(response.data);
      setError(null);
    } catch (error) {
      setError(
        "Error occurred while creating a new username: " + error.message
      );
    }
  };

  /**
   * Function to add Tasks
   * @param {*} taskName
   * @param {*} taskDescription
   */
  const addTask = async (taskName, taskDescription) => {
    try {
      const newTask = {
        title: taskName,
        description: taskDescription,
      };

      await api.post("/create/", newTask, {});

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error occurred while creating a new task: " + error.message);
    }
  };

  /**
   * Function to delete Tasks
   * @param {*} taskId
   */
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/delete/${taskId}`);
      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error happened deleting the task: " + error.message);
    }
  };

  /**
   * Function to update Tasks
   * @param {*} taskId
   * @param {*} updatedTask
   */
  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.put(`/update/${taskId}`, updatedTask);
      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error happened updating the task: " + error.message);
    }
  };

  /**
   * Function to mark tasks as done
   * @param {*} taskId
   */
  const completeTask = async (taskId) => {
    try {
      await api.patch(`/complete/${taskId}`);
      // Refresh Task
      refreshTasks();
    } catch (error) {
      setError("Error happened marking the task as done: " + error.message);
    }
  };

  /**
   * Function to refresh the tasks after each update
   */
  const refreshTasks = async () => {
    try {
      const response = await api.get("/tasks");
      const { data } = response;
      if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
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
        user,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
