import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayTask from "./components/DisplayTask";
import AddTask from "./components/AddTask";
import TaskProvider from "./provider/TaskProvider";

function App() {
  return (
    <div className="app">
      <h1>My Todos</h1>
      <TaskProvider>
        <AddTask />
        <DisplayTask />
      </TaskProvider>
    </div>
  );
}

export default App;
