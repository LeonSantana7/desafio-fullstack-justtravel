export default function FilterTasks({ filter, setFilter }) {
  return (
    <div className="btn-group">
      <button
        className={`btn ${
          filter === "all" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setFilter("all")}
      >
        Todas
      </button>
      <button
        className={`btn ${
          filter === "completed" ? "btn-success" : "btn-outline-success"
        }`}
        onClick={() => setFilter("completed")}
      >
        Completas
      </button>
      <button
        className={`btn ${
          filter === "pending" ? "btn-warning" : "btn-outline-warning"
        }`}
        onClick={() => setFilter("pending")}
      >
        Pendentes
      </button>
    </div>
  );
}
