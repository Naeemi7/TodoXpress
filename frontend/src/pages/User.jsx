import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskContext from "../context/useTaskContext";

const User = () => {
  const usernameRef = useRef(null);
  const { createUsername } = useTaskContext();
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const [buttonValue, setButtonValue] = useState("Register");
  const [notificationClass, setNotificationClass] = useState("");

  const handleUsername = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;

    // Reset previous notification
    setNotification("");
    setNotificationClass("");

    if (username.length < 6) {
      setNotification("Your username must be at least 6 characters.");
      setNotificationClass("less-than");
    } else {
      try {
        const response = await createUsername(username);

        if (response.message === 200) {
          setNotificationClass("exists");
          setNotification("The username already exists!");
          setButtonValue("Login");

          setTimeout(() => {
            navigate("/home");
          }, 500);
        } else if (response.message === 201) {
          setNotificationClass("success");
          setNotification("User created successfully!");

          setTimeout(() => {
            navigate("/home");
          }, 500);
        }
      } catch (error) {
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
        <button type="submit">{buttonValue}</button>
      </form>
      <p
        className={`notification ${
          notificationClass && "show"
        } ${notificationClass}`}
      >
        {notification}
      </p>
    </div>
  );
};

export default User;
