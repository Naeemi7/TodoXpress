import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import useTaskContext from "../context/useTaskContext";

const AddTask = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const { addTask, userName } = useTaskContext();
  const navigate = useNavigate();

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
    <div className="header-container">
      <div className="header">
        <h2 className="welcome">Welcome, {userName}</h2>
        <div className="logout-btn-container">
          <FaArrowRightToBracket
            className="logout-icon"
            onClick={() => navigate("/")}
          />
          <span className="logout-subtext">Logout</span>
        </div>
      </div>
      <div className="header-content">
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
