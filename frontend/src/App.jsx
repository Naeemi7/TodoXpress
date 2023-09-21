import { useState } from "react";
import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayTask from "./components/DisplayTask";
import AddTask from "./components/AddTask";

function App() {
  const [taskAdded, setTaskAdded] = useState(false);

  const handleTaskAdded = () => {
    setTaskAdded(!taskAdded);
  };

  return (
    <div className="app">
      <h1>My Todos</h1>
      <AddTask onTaskAdded={handleTaskAdded} />
      <DisplayTask key={taskAdded} />
    </div>
  );
}

export default App;
