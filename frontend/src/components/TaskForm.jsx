import { useState } from "react";

const timeOptions = [];
for (let hour = 6; hour <= 22; hour++) {
  for (let min of [0, 30]) {
    const h = hour.toString().padStart(2, "0");
    const m = min.toString().padStart(2, "0");
    timeOptions.push(`${h}:${m}`);
  }
}

export default function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const combineDateTime = (date, time) => {
    if (!date || !time) return "";
    return `${date}T${time}:00`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const startDateTime = combineDateTime(startDate, startTime);
    const endDateTime = combineDateTime(endDate, endTime);

    onAddTask(newTask, priority, startDateTime, endDateTime);

    setNewTask("");
    setPriority("low");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded mb-4 bg-light">
      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label fw-bold">
          Nova Tarefa
        </label>
        <input
          id="taskTitle"
          type="text"
          placeholder="O que você precisa fazer?"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div className="row g-3 mb-3 align-items-end">
        {/* Início */}
        <div className="col-md">
          <label className="form-label">Início (Opcional)</label>
          <input
            type="date"
            className="form-control mb-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <select
            className="form-select"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">Hora</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Fim */}
        <div className="col-md">
          <label className="form-label">Fim (Opcional)</label>
          <input
            type="date"
            className="form-control mb-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <select
            className="form-select"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            <option value="">Hora</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Prioridade */}
        <div className="col-md-auto">
          <label htmlFor="priority" className="form-label">
            Prioridade
          </label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100 fw-bold"
        aria-label="Adicionar tarefa"
      >
        <i className="fas fa-plus me-2"></i> Adicionar Tarefa
      </button>
    </form>
  );
}
