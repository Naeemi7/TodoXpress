import { useState, useEffect, useMemo } from "react";
import useTaskContext from "../context/useTaskContext";
import { FaCheckCircle, FaTimesCircle, FaPen } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const DisplayTask = () => {
  const { tasks, deleteTask, updateTask, completeTask, refreshTasks } =
    useTaskContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Function to format a date as Month (string), day, year, and time
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleString(undefined, options);
  };

  const toggleUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setShowUpdateModal(!showUpdateModal);
  };

  const handleUpdate = async () => {
    try {
      if (selectedTask) {
        const updatedTask = {
          title: updatedTitle,
          description: updatedDescription,
        };

        await updateTask(selectedTask._id, updatedTask);

        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error("Error happened while updating the task", error);
    }
  };

  const toggleDoneStatus = async (taskId, currentCompleted) => {
    try {
      const updatedTask = {
        completed: !currentCompleted,
      };

      await completeTask(taskId, updatedTask);
    } catch (error) {
      console.error("Error happened while updating the task", error);
    }
  };

  // Use useMemo to memoize pendingTasks and completedTasks
  const pendingTasks = useMemo(
    () => (tasks ? tasks.filter((item) => !item.completed) : []),
    [tasks]
  );
  const completedTasks = useMemo(
    () => (tasks ? tasks.filter((item) => item.completed) : []),
    [tasks]
  );

  //Check if PendingTasks and Complete Tasks are empty and trigger a refresh if needed
  useEffect(() => {
    if (pendingTasks.length === 0 || completedTasks.length === 0) {
      refreshTasks();
    }
  }, [pendingTasks, completedTasks, refreshTasks]);

  return (
    <>
      {pendingTasks.length === 0 ? null : (
        <div className="task-section">
          <h3>Pending Tasks</h3>
          {pendingTasks.map((item) => (
            <div key={item._id} className="task-container pending-task">
              <div className="content-container">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{formatDate(item.createdAt)}</p>
              </div>
              <div className="button-container">
                <FaCheckCircle
                  className="icons done"
                  onClick={() => toggleDoneStatus(item._id, item.completed)}
                />
                <FaTimesCircle
                  className="icons delete"
                  onClick={() => deleteTask(item._id)}
                />
                <FaPen
                  className="icons update"
                  onClick={() => toggleUpdateModal(item)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {completedTasks.length === 0 ? null : (
        <div className="task-section">
          <h3>Completed Tasks</h3>
          {completedTasks.map((item) => (
            <div key={item._id} className="task-container completed-task">
              <div className="content-container">
                <h2 style={{ textDecoration: "line-through" }}>{item.title}</h2>
                <p>{item.description}</p>
                <p>{formatDate(item.createdAt)}</p>
              </div>
              <div className="button-container">
                <FaCheckCircle
                  className={`icons done${item.completed ? " completed" : ""}`}
                  onClick={() => toggleDoneStatus(item._id, item.completed)}
                />
                <FaTimesCircle
                  className="icons delete"
                  onClick={() => deleteTask(item._id)}
                />
                <FaPen
                  className="icons update"
                  onClick={() => toggleUpdateModal(item)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        className="custom-modal"
      >
        <Modal.Body className="custom-modal-body">
          <Form>
            <Form.Group controlId="updateTitle">
              <Form.Label className="text-white">Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="updateDescription">
              <Form.Label className="text-white">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="custom-input"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayTask;
