import { useState } from "react";
import useTaskContext from "../context/useTaskContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Modal, Button, Form } from "react-bootstrap";

const DisplayTask = () => {
  const { tasks, deleteTask, updateTask } = useTaskContext();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const toggleUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setShowUpdateModal(!showUpdateModal);
  };

  const handleUpdate = async () => {
    try {
      const updatedTask = {
        title: updatedTitle,
        description: updatedDescription,
      };

      await updateTask(selectedTask._id, updatedTask);

      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error happened while updating the task", error);
    }
  };

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
              onClick={() => deleteTask(item._id)}
            />
            <FaPenToSquare
              className="icons update"
              onClick={() => toggleUpdateModal(item)}
            />
          </div>
        </div>
      ))}

      {/* Update Modal */}
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
          <Button variant="secondary" onClick={toggleUpdateModal}>
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
