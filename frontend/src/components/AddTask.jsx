// AddTask.js

import { useRef } from "react";
import axios from "axios";

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

      await axios.post("http://localhost:5000/api/tasks/create", newTask);

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
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="text" placeholder="Description" ref={descriptionRef} />

      <button className="add-btn" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
