import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask(newTask, priority);
    setNewTask("");
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mt-3 w-100 gap-2">
      <div className="input-group">
        <input
          type="text"
          placeholder="Adicionar uma nova tarefa..."
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <select
          className="form-select flex-grow-0 w-auto"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        aria-label="Adicionar tarefa"
      >
        <i className="fas fa-plus"></i>
      </button>
    </form>
  );
}
