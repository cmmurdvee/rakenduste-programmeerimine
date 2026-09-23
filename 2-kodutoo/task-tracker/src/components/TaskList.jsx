import { useState } from "react";
import { Link } from "react-router-dom";
import { TaskCard } from "./TaskCard";
import { TaskFilter } from "./TaskFilter";
import "./TaskList.css";

// filter teeb uue array, originaal jääb samaks
function filterTasks(tasks, filter) {
  if (filter === "completed") return tasks.filter((task) => task.completed);
  if (filter === "incomplete") return tasks.filter((task) => !task.completed);
  return tasks;
}

export function TaskList({ tasks, onToggle, onDelete }) {
  // state-is on ainult valitud filter, filtreeritud listi arvutan iga kord
  const [filter, setFilter] = useState("all");
  const visibleTasks = filterTasks(tasks, filter);

  return (
    <section>
      <TaskFilter value={filter} onChange={setFilter} />

      {visibleTasks.length === 0 ? (
        <p className="task-list__empty">No tasks found</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            // key on task.id, mitte index
            <li key={task.id}>
              <TaskCard task={task} onToggle={onToggle} onDelete={onDelete}>
                <Link to={`/tasks/${task.id}`}>Details</Link>
              </TaskCard>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
