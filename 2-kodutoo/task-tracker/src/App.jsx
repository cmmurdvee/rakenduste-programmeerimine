import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";
import { TasksPage } from "./pages/TasksPage";
import { getTasks } from "./services/taskApi";

// uus id = suurim id + 1 (tasks.length + 1 ei tööta peale kustutamist)
function getNextId(tasks) {
  return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
}

function App() {
  // taskid on siin, et kõik lehed saaksid neid kasutada
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("loading"); // loading, error või success
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  // laeb taskid kui leht avatakse (ja kui vajutan "Try again")
  useEffect(() => {
    let ignore = false;

    getTasks()
      .then((loadedTasks) => {
        if (!ignore) {
          setTasks(loadedTasks);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setStatus("error");
        }
      });

    // cleanup - vana päringu vastust ei kasuta
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  function handleRetry() {
    setStatus("loading");
    setReloadCount((count) => count + 1);
  }

  // lisab uue taski (teen uue array, vana ei muuda)
  function handleAddTask(title) {
    setTasks((previous) => [
      ...previous,
      { id: getNextId(previous), title, completed: false },
    ]);
  }

  // muudab completed true/false
  function handleToggleTask(id) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // kustutab taski
  function handleDeleteTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return (
    <main>
      <Header />
      <nav className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
      </nav>

      {status === "loading" && <p>Loading tasks…</p>}

      {status === "error" && (
        <div role="alert">
          <p>Something went wrong: {error}</p>
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
        </div>
      )}

      {status === "success" && (
        <Routes>
          <Route path="/" element={<HomePage tasks={tasks} />} />
          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            }
          />
          <Route
            path="/tasks/:taskId"
            element={<TaskDetailsPage tasks={tasks} />}
          />
          {/* kõik muud lingid */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
