import { useState } from "react";
import Swal from "sweetalert2";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, pode deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task.id);
        Swal.fire("Deletado!", "Sua tarefa foi removida.", "success");
      }
    });
  };

  const priorityMap = {
    high: { label: "Alta", bg: "danger" },
    medium: { label: "Média", bg: "warning" },
    low: { label: "Baixa", bg: "secondary" },
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center task-item p-3 gap-3 ${
        task.completed ? "list-group-item-light" : ""
      }`}
    >
      {isEditing ? (
        <div className="d-flex w-100 gap-2">
          <input
            type="text"
            className="form-control"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
          <button className="btn btn-success" onClick={handleSave}>
            Salvar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center flex-grow-1 gap-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                style={{ cursor: "pointer", transform: "scale(1.3)" }}
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                aria-label="Marcar tarefa como concluída"
              />
            </div>

            <div className="d-flex flex-column align-items-start w-100">
              <div className="d-flex align-items-center task-title">
                {task.completed && (
                  <i className="fas fa-check-circle text-success me-2"></i>
                )}
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.5 : 1,
                  }}
                >
                  {task.title}
                </span>
              </div>

              {task.startTime && (
                <div
                  className="mt-2"
                  style={{ opacity: task.completed ? 0.5 : 1 }}
                >
                  <small className="text-primary fw-bold">
                    <i className="far fa-clock me-1"></i>
                    {formatTime(task.startTime)}
                    {task.endTime && ` - ${formatTime(task.endTime)}`}
                  </small>
                </div>
              )}

              <div
                className="mt-1"
                style={{ opacity: task.completed ? 0.5 : 1 }}
              >
                <span
                  className={`badge bg-${
                    priorityMap[task.priority]?.bg || "secondary"
                  } me-2`}
                >
                  {priorityMap[task.priority]?.label || "Normal"}
                </span>
                <small className="text-muted">
                  Modificado em: {formatDate(task.createdAt)}
                </small>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={confirmDelete}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
