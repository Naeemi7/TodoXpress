import { useContext } from "react";
import TaskContext from "./TaskContext";

function useTaskContext() {
  return useContext(TaskContext);
}

export default useTaskContext;
