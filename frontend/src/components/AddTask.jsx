import { useRef } from "react";
import api from "../api/axiosConfig";

const AddTask = ({ onTaskAdded }) => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const addTask = async () => {
    try {
      const taskName = nameRef.current.value;
      const taskDescription = descriptionRef.current.value;

      const newTask = {
        title: taskName,
        description: taskDescription,
      };

      // Axios instance with the default base URL
      await api.post("/tasks/create", newTask);

      // Clear input fields
      nameRef.current.value = "";
      descriptionRef.current.value = "";

      // Notify the parent component that a task has been added
      onTaskAdded();
    } catch (error) {
      console.error("Error occurred while creating a new task:", error);
    }
  };

  return (
    <div className="header">
      <input type="text" placeholder="Task Name" ref={nameRef} />
      <input type="text" placeholder="Task Description" ref={descriptionRef} />

      <button className="add-btn" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
