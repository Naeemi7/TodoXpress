import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get("/getAllTask", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response && response.data && Array.isArray(response.data.tasks)) {
          // Check if response.data.tasks is an array
          setTasks(response.data.tasks);
          setError(null); // Clear any previous errors
        } else {
          setError("Data structure from the server is incorrect");
        }
      } catch (error) {
        setError("Error happened fetching data");
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
      setError("Error occurred while creating a new task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/deleteTask/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error happened deleting the task");
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.put(`/updateTask/${taskId}`, updatedTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      setError("Error happened updating the task");
    }
  };

  const completeTask = async (taskId) => {
    try {
      await api.patch(`/completeTask/${taskId}`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Refresh Task
      refreshTasks();
    } catch (error) {
      setError("Error happened updating the task");
    }
  };

  const refreshTasks = async () => {
    try {
      const response = await api.get("/getAllTask", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = response;
      if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
        setError(null); // Clear any previous errors
      } else {
        setError("Data structure from the server is incorrect during refresh");
      }
    } catch (error) {
      setError("Error happened fetching data during refresh");
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
