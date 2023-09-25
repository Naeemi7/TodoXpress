import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get("/getAllTask");

        if (response && response.data && Array.isArray(response.data.tasks)) {
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

  const addTask = async (taskName, taskDescription) => {
    try {
      const newTask = {
        title: taskName,
        description: taskDescription,
      };

      await api.post("/addTask/", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error occurred while creating a new task: " + error.message);
    }
  };

  // For Delete Task
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/deleteTask/${taskId}`);
      console.log(taskId);
      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error happened deleting the task: " + error.message);
    }
  };

  // For Update Task
  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.put(`/updateTask/${taskId}`, updatedTask);

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error happened updating the task: " + error.message);
    }
  };

  // For Mark Task as Done
  const completeTask = async (taskId) => {
    try {
      await api.patch(`/completeTask/${taskId}`);

      // Refresh Task
      refreshTasks();
    } catch (error) {
      setError("Error happened marking the task as done: " + error.message);
    }
  };

  const refreshTasks = async () => {
    try {
      const response = await api.get("/getAllTask");
      const { data } = response;
      if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
        setError(null); // Clear any previous errors
      } else {
        setError("Data structure from the server is incorrect during refresh");
      }
    } catch (error) {
      setError("Error happened fetching data during refresh: " + error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, updateTask, completeTask, error }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
