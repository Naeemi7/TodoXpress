import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskContext from "../context/useTaskContext";

const User = () => {
  const usernameRef = useRef(null);
  const { createUsername, error } = useTaskContext();
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleUsername = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;

    // Reset previous notification
    setNotification("");

    if (username.length < 6) {
      setNotification("Your username must be at least 6 characters.");
    } else {
      try {
        const response = await createUsername(username);
        console.log("Response from server:", response);
        navigate("/home");

        if (response.error === "Username already exists") {
          // Display the error message to the user
          setNotification(response.error);
        } else if (response.message === "Username created successfully!") {
          setNotification("Username created successfully!");
        }
      } catch (error) {
        console.error(
          "Error occurred while communicating with the server:",
          error
        );
        setNotification("Error occurred while communicating with the server.");
      }
    }
  };

  return (
    <div className="user-container">
      <form onSubmit={handleUsername}>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p className={`notification ${notification && "show"}`}>{notification}</p>
    </div>
  );
};

export default User;
