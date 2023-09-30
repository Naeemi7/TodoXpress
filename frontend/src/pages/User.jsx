import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTaskContext from "../context/useTaskContext";

const User = () => {
  const usernameRef = useRef(null);
  const { createUsername, error, user } = useTaskContext();
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If user exists (username is created successfully), navigate to home after 3 seconds
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  }, [user, navigate]);

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

        if (response.error === "Username already exists") {
          // Display the error message to the user
          setNotification(response.error);
        } else if (response.message === "New User created") {
          setNotification("Username created successfully!");
          navigate("/home");
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
