import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { TasksPage } from './pages/TasksPage';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from './services/taskApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    let ignore = false;

    getTasks()
      .then((loadedTasks) => {
        if (!ignore) {
          setTasks(loadedTasks);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setStatus('error');
        }
      });

    // cleanup - vana vastust ei kasuta
    return () => {
      ignore = true;
    };
  }, [reloadCount]);

  function handleRetry() {
    setStatus('loading');
    setReloadCount((count) => count + 1);
  }

  async function handleAddTask(title) {
    // id tuleb serverist
    const createdTask = await createTask(title);
    setTasks((previous) => [...previous, createdTask]);
  }

  async function handleToggleTask(id) {
    const task = tasks.find((item) => item.id === id);
    try {
      const updatedTask = await updateTask(id, { completed: !task.completed });
      setTasks((previous) =>
        previous.map((item) => (item.id === id ? updatedTask : item)),
      );
      setActionError(null);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      setTasks((previous) => previous.filter((task) => task.id !== id));
      setActionError(null);
    } catch (err) {
      setActionError(err.message);
    }
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

      {status === 'loading' && <p>Loading tasks…</p>}

      {status === 'error' && (
        <div role="alert">
          <p>Something went wrong: {error}</p>
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
        </div>
      )}

      {actionError && (
        <div role="alert" className="action-error">
          <p>{actionError}</p>
          <button type="button" onClick={() => setActionError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {status === 'success' && (
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
