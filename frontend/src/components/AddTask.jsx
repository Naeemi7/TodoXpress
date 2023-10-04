import { useRef } from "react";
import useTaskContext from "../context/useTaskContext";

const AddTask = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const { addTask, userName } = useTaskContext();
  const handleAddTask = () => {
    const taskName = nameRef.current.value;
    const taskDescription = descriptionRef.current.value;

    if (taskName && taskDescription) {
      addTask(taskName, taskDescription);
      nameRef.current.value = "";
      descriptionRef.current.value = "";
    }
  };

  return (
    <div>
      <h2>Welcome, {userName}</h2>
      <div className="header">
        <input type="text" placeholder="Task Name" ref={nameRef} />
        <input
          type="text"
          placeholder="Task Description"
          ref={descriptionRef}
        />

        <button className="add-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
