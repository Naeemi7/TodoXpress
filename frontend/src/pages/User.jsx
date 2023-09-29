import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskContext from "../context/useTaskContext";

const User = () => {
  const usernameRef = useRef(null);
  const { createUsername } = useTaskContext();
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleUsername = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;

    // Reset previous notification
    setNotification("");

    if (!username) {
      setNotification("Please enter a username to register.");
    } else if (username.length < 6) {
      setNotification("Your username must be at least 6 characters.");
    } else {
      await createUsername(username);
      navigate("/home"); // Navigate to the Home component after successful registration
    }
  };

  return (
    <div className="user-container">
      <form onSubmit={handleUsername}>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Enter your username"
        />
        <button type="submit">Register</button>
      </form>
      <p className={`notification ${notification && "show"}`}>{notification}</p>
    </div>
  );
};

export default User;
