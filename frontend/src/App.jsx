import { useRef, useState } from "react";
import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayTask from "./components/DisplayTask";

function App() {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = () => {
    setName(nameRef.current.value);
  };

  const handleDescriptionChange = () => {
    setDescription(descriptionRef.current.value);
  };

  return (
    <div className="app">
      <h1>My Todos</h1>
      <div className="header">
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Description"
          ref={descriptionRef}
          onChange={handleDescriptionChange}
        />
        <button className="add-btn">Add task</button>
      </div>
      <p>
        {name} {description}
      </p>
      <DisplayTask />
    </div>
  );
}

export default App;
