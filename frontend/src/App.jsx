import { useState } from "react";
import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayTask from "./components/DisplayTask";
import AddTask from "./components/AddTask";
import axios from "axios";

function App() {
  const [taskAdded, setTaskAdded] = useState(false);

  const handleTaskAdded = () => {
    setTaskAdded(!taskAdded);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);
      handleTaskAdded(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error happened deleting the task", error);
    }
  };

  return (
    <div className="app">
      <h1>My Todos</h1>
      <AddTask onTaskAdded={handleTaskAdded} />
      <DisplayTask onDeleteTask={handleDeleteTask} key={taskAdded} />
    </div>
  );
}

export default App;
