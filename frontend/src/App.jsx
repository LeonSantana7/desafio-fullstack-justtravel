import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterTasks from "./components/FilterTasks";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    if (!API_URL) {
      console.error("A URL da API não está configurada.");
      return;
    }
    axios.get(`${API_URL}/tasks`).then((res) => setTasks(res.data));
  }, []);

  const sortTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      sorted.sort(
        (a, b) =>
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
      );
    } else if (sortBy === "startTime") {
      sorted.sort((a, b) => {
        if (a.startTime && b.startTime)
          return new Date(a.startTime) - new Date(b.startTime);
        if (a.startTime) return -1;
        if (b.startTime) return 1;
        return 0;
      });
    } else {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sorted;
  };

  const filteredTasks = sortTasks(
    tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
  );

  const addTask = (title, priority, startTime, endTime) => {
    const newTaskData = { title, priority };
    if (startTime) newTaskData.startTime = new Date(startTime).toISOString();
    if (endTime) newTaskData.endTime = new Date(endTime).toISOString();

    axios.post(`${API_URL}/tasks`, newTaskData).then((res) => {
      const newTasks = [res.data, ...tasks];
      setTasks(sortTasks(newTasks));
    });
  };

  const toggleTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    axios
      .patch(`${API_URL}/tasks/${id}`, { completed: !task.completed })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      });
  };

  const editTask = (id, newTitle) => {
    axios.patch(`${API_URL}/tasks/${id}`, { title: newTitle }).then((res) => {
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <>
      <div className="container px-3">
        <div className="app-container mx-auto">
          <div
            className="p-4 text-white rounded-top"
            style={{
              background: "linear-gradient(to right, #7c3aed, #3b82f6)",
            }}
          >
            <h2 className="fw-bold text-center mb-1">Minha Lista de Tarefas</h2>
            <p className="text-center mb-0">Organize seu dia</p>
          </div>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <FilterTasks filter={filter} setFilter={setFilter} />
              <div>
                <label className="me-2 fw-medium text-muted">
                  Ordenar por:
                </label>
                <select
                  className="form-select form-select-sm d-inline w-auto"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Data</option>
                  <option value="priority">Prioridade</option>
                  <option value="startTime">Horário</option>
                </select>
              </div>
            </div>
            <TaskForm onAddTask={addTask} />
            {tasks.length > 0 ? (
              <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ) : (
              <div className="text-center text-muted py-5">
                <i className="fas fa-tasks fa-3x mb-3"></i>
                <p>Nenhuma tarefa encontrada</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
