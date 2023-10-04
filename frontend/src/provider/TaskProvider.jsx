import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import taskApi from "../api/taskApi";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await taskApi.get(`/task/${userId}`);

        if (Array.isArray(response.data)) {
          setTasks(response.data);
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

  const createUsername = async (username) => {
    try {
      setError(null);

      const response = await api.post("/users/register", { username });

      if (
        response.status === 200 &&
        response.data.message === "Username already exists"
      ) {
        setError("Username already exists");
        setUserName(response.data.user.username);
        setUserId(response.data.user._id);
        return { message: "Exists" };
      } else {
        setUserName(response.data.user.username);
        setUserId(response.data.user._id);
        return { message: "User created successfully" };
      }
    } catch (error) {
      console.error("Error occurred while creating a new username:", error);
      setError("Error occurred while creating a new username.");
      return { error: "Error occurred while creating a new username" };
    }
  };

  const addTask = async (taskName, taskDescription) => {
    try {
      const newTask = {
        title: taskName,
        description: taskDescription,
      };

      await taskApi.patch(`/task/add/${userId}`, newTask, {});

      refreshTasks();
    } catch (error) {
      setError("Error occurred while creating a new task: " + error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskApi.patch(`/task/delete/userId/${userId}/taskId/${taskId}`);

      refreshTasks();
    } catch (error) {
      setError("Error happened deleting the task: " + error.message);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await taskApi.put(`/task/update/${taskId}`, updatedTask);

      refreshTasks();
    } catch (error) {
      setError("Error happened updating the task: " + error.message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await taskApi.patch(`/task/complete/${taskId}`);

      refreshTasks();
    } catch (error) {
      setError("Error happened marking the task as done: " + error.message);
    }
  };

  const refreshTasks = async () => {
    try {
      const response = await taskApi.get(`/task/${userId}`);
      if (Array.isArray(response.data)) {
        setTasks(response.data);
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

export default TaskProvider;
