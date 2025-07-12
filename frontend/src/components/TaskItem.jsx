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

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center task-item p-3 gap-3">
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
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label="Marcar tarefa como concluída"
            />
            <div className="d-flex flex-column align-items-start">
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
              <div>
                <span
                  className={`badge bg-${
                    priorityMap[task.priority]?.bg || "secondary"
                  } me-2`}
                >
                  {priorityMap[task.priority]?.label || "Normal"}
                </span>
                <small className="text-muted">
                  Criado em:{" "}
                  {`${new Date(task.createdAt).toLocaleDateString(
                    "pt-BR"
                  )} às ${new Date(task.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
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
