import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get("/getAllTask", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { data } = response;
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error happened fetching data", error);
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

      await api.post("/createTask", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Refresh tasks
      refreshTasks();
    } catch (error) {
      console.error("Error occurred while creating a new task:", error);
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
      console.error("Error happened deleting the task", error);
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
      console.error("Error happened updating the task", error);
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
      console.log("Error happened updating the task", error);
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
