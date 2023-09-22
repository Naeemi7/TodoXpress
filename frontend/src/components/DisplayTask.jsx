import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

const DisplayTask = ({ onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        const { data } = response;
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error happened fetching data", error);
      }
    };
    fetchAllTasks();
  }, []);

  return (
    <>
      {tasks.map((item) => (
        <div key={item._id} className="task-container">
          <div className="content-container">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{new Date(item.createdAt).toLocaleString()}</p>
          </div>
          <div className="button-container">
            <FaCheckCircle className="icons done" />
            <FaTimesCircle
              className="icons delete"
              onClick={() => onDeleteTask(item._id)} // Call onDeleteTask with item._id as a parameter
            />
            <FaPenToSquare className="icons update" />
          </div>
        </div>
      ))}
    </>
  );
};

export default DisplayTask;
