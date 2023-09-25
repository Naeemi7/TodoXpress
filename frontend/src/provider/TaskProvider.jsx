import { useEffect, useReducer } from "react";
import api from "../api/axiosConfig";
import TaskContext from "../context/TaskContext";

const initialState = {
  tasks: [],
  error: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await api.get("/getAllTask");

        if (response.data && Array.isArray(response.data.tasks)) {
          dispatch({ type: "SET_TASKS", payload: response.data.tasks });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "Data structure from the server is incorrect",
          });
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error happened fetching data: " + error.message,
        });
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

      // No need to explicitly refresh tasks, as the effect will handle it
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error occurred while creating a new task: " + error.message,
      });
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/deleteTask?id=${taskId}`);
      // No need to explicitly refresh tasks, as the effect will handle it
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error happened deleting the task: " + error.message,
      });
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await api.put(`/updateTask?id=${taskId}`, updatedTask);
      // No need to explicitly refresh tasks, as the effect will handle it
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error happened updating the task: " + error.message,
      });
    }
  };

  const completeTask = async (taskId) => {
    try {
      await api.patch(`/completeTask?id=${taskId}`);
      // No need to explicitly refresh tasks, as the effect will handle it
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error happened marking the task as done: " + error.message,
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        updateTask,
        completeTask,
        error: state.error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
