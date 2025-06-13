import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import "./App.css";
import './style.css';
import TaskForm from "./TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({})

  useEffect(() => {
    fetchTasks()
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks");
    const data = await response.json();
    setTasks(data.tasks);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    if (isModalOpen) return
    setCurrentTask(task)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchTasks()
  }

return (
  <div className="app-container">
    <button id="create-task-btn" onClick={openCreateModal}>Create New Task</button>
    <TaskList tasks={tasks} updateTask={openEditModal} updateCallback={onUpdate} />
    
    {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <TaskForm existingTask={currentTask} updateCallback={onUpdate} />
        </div>
      </div>
    )}
  </div>
);

}

export default App;