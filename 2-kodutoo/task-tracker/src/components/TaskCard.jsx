import "./TaskCard.css";

// näitab ühte taski, nupud kutsuvad App-i funktsioone
export function TaskCard({ task, onToggle, onDelete, children }) {
  return (
    <article
      className={`task-card ${task.completed ? "task-card--completed" : ""}`}
    >
      <div className="task-card__body">
        <h3 className="task-card__title">{task.title}</h3>
        <p className="task-card__status">
          {task.completed ? "Completed" : "Not completed"}
        </p>
      </div>
      <div className="task-card__actions">
        {/* siia tuleb Details link */}
        {children}
        <button type="button" onClick={() => onToggle(task.id)}>
          Toggle status
        </button>
        <button type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
