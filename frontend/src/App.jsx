import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterTasks from "./components/FilterTasks";
import Footer from "./components/Footer";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  const sortTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      sorted.sort(
        (a, b) =>
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
      );
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

  const addTask = (title, priority) => {
    const newTask = {
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    axios.post("http://localhost:5000/tasks", newTask).then((res) => {
      setTasks([res.data, ...tasks]);
    });
  };

  const toggleTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    axios
      .patch(`http://localhost:5000/tasks/${id}`, {
        completed: !task.completed,
      })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      });
  };

  const editTask = (id, newTitle) => {
    axios
      .patch(`http://localhost:5000/tasks/${id}`, { title: newTitle })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <div className="container px-3">
      <div className="app-container mx-auto">
        <div
          className="p-4 text-white rounded-top"
          style={{
            background: "linear-gradient(to right, #7c3aed, #3b82f6)",
          }}
        >
          <h2 className="fw-bold text-center mb-1">To-do List</h2>
          <p className="text-center mb-0">Organize seu dia</p>
        </div>

        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <FilterTasks filter={filter} setFilter={setFilter} />
            <div>
              <label className="me-2 fw-medium text-muted">Ordenar por:</label>
              <select
                className="form-select form-select-sm d-inline w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Data</option>
                <option value="priority">Prioridade</option>
              </select>
            </div>
          </div>

          <TaskForm onAddTask={addTask} />

          {filteredTasks.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="fas fa-tasks fa-3x mb-3"></i>
              <p>Nenhuma tarefa encontrada</p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
