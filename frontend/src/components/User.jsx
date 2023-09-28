import { useRef, useState } from "react";
const User = () => {
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(usernameRef.current.value);
  };
  return (
    <div className="user-container">
      <form>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Enter your username"
        />
        <button onClick={handleUsername}>Submit</button>
      </form>
      <p>{username}</p>
    </div>
  );
};

export default User;
