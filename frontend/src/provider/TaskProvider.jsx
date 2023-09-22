import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get("/tasks");
        const { data } = response;
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error happened fetching data", error);
      }
    };
    fetchAllTasks();
  }, []);

  /**
   * Function to add a new task
   * @param {string} taskName
   * @param {string} taskDescription
   */
  const addTask = async (taskName, taskDescription) => {
    try {
      const newTask = {
        title: taskName,
        description: taskDescription,
      };

      await api.post("/tasks/create", newTask);

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      console.error("Error occurred while creating a new task:", error);
    }
  };

  /**
   * Function to delete a task
   * @param {string} taskId
   */
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/delete/${taskId}`);

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      console.error("Error happened deleting the task", error);
    }
  };

  /**
   * Function to update a task
   * @param {string} taskId
   * @param {object} updatedTask - An object containing the updated task details (title and description)
   */
  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.put(`/tasks/update/${taskId}`, updatedTask);

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      console.error("Error happened updating the task", error);
    }
  };

  /**
   * function to complete the task
   * @param {*} taskId
   */
  const completeTask = async (taskId) => {
    try {
      await api.patch(`/tasks/complete/${taskId}`);

      //Refresh Task
      refreshTasks();
    } catch (error) {
      console.log("Error happend updating the task", error);
    }
  };

  /**
   * Function to refreshes the tasks
   */
  const refreshTasks = async () => {
    try {
      const response = await api.get("/tasks");
      const { data } = response;
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error happened fetching data", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, updateTask, completeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
