import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home"; //
import User from "./pages/User";

function App() {
  return (
    <div className="app">
      <h1>My Todos</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />{" "}
          {/* Render User component initially */}
          <Route path="/home" element={<Home />} />{" "}
          {/* Render Home component after successful registration */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
