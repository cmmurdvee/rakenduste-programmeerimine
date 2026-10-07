import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { tasks as defaultTasks } from './data/tasks.js';
import { createTaskSaver, loadTasks } from './taskStore.js';

const PORT = process.env.PORT || 3000;

const TASKS_FILE =
  process.env.TASKS_FILE ||
  fileURLToPath(new URL('../data/tasks.json', import.meta.url));

let initialTasks;
try {
  initialTasks = await loadTasks(TASKS_FILE, defaultTasks);
} catch (error) {
  console.error(`Could not load tasks: ${error.message}`);
  process.exit(1);
}

const app = createApp({
  initialTasks,
  saveTasks: createTaskSaver(TASKS_FILE),
});

app.listen(PORT, (error) => {
  // express 5 annab vea siia, nt kui port on kinni
  if (error) {
    console.error(`Could not start the server: ${error.message}`);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Tasks are saved to ${TASKS_FILE}`);
});
