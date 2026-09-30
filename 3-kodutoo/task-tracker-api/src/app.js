import cors from 'cors';
import express from 'express';
import { tasks as defaultTasks } from './data/tasks.js';
import { HttpError } from './errors.js';
import { errorHandler, notFound, requestLogger } from './middleware.js';
import {
  getAllTasks,
  getCompletedTasks,
  getIncompleteTasks,
  getTaskById,
} from './taskFunctions.js';

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:4173'
)
  .split(',')
  .map((origin) => origin.trim());

// url-ist tuleb string, teen numbriks
function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, 'Task id must be a positive integer');
  }
  return id;
}

function findTask(tasks, id) {
  const task = getTaskById(tasks, id);
  if (!task) {
    throw new HttpError(404, 'Task not found');
  }
  return task;
}

function getNextId(tasks) {
  return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
}

function validateTitle(title) {
  if (typeof title !== 'string') {
    throw new HttpError(400, 'Title is required and must be a string');
  }
  if (title.trim() === '') {
    throw new HttpError(400, 'Title cannot be empty');
  }
  return title.trim();
}

// iga kord uus app, et igal testil oleks värsked andmed
export function createApp({
  initialTasks = defaultTasks,
  saveTasks = async () => {},
} = {}) {
  const app = express();

  let tasks = structuredClone(initialTasks);

  if (process.env.NODE_ENV !== 'test') {
    app.use(requestLogger);
  }
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/tasks', (req, res) => {
    const { completed } = req.query;

    if (completed === undefined) {
      return res.json(getAllTasks(tasks));
    }
    // 'false' on ka string, seega võrdlen tekstiga
    if (completed === 'true') {
      return res.json(getCompletedTasks(tasks));
    }
    if (completed === 'false') {
      return res.json(getIncompleteTasks(tasks));
    }
    throw new HttpError(400, 'completed must be "true" or "false"');
  });

  app.get('/api/tasks/:id', (req, res) => {
    const task = findTask(tasks, parseId(req.params.id));
    res.json(task);
  });

  app.post('/api/tasks', async (req, res) => {
    // kontrollin ka backendis, reacti kontrollist ei piisa
    const title = validateTitle(req.body?.title);

    const newTask = { id: getNextId(tasks), title, completed: false };
    tasks = [...tasks, newTask];
    await saveTasks(tasks);

    res.status(201).json(newTask);
  });

  app.patch('/api/tasks/:id', async (req, res) => {
    const id = parseId(req.params.id);
    const task = findTask(tasks, id);

    const body = req.body ?? {};
    const changes = {};

    if (body.title !== undefined) {
      changes.title = validateTitle(body.title);
    }
    if (body.completed !== undefined) {
      if (typeof body.completed !== 'boolean') {
        throw new HttpError(400, 'completed must be a boolean');
      }
      changes.completed = body.completed;
    }
    if (Object.keys(changes).length === 0) {
      throw new HttpError(400, 'Provide title and/or completed to update');
    }

    const updatedTask = { ...task, ...changes };
    tasks = tasks.map((item) => (item.id === id ? updatedTask : item));
    await saveTasks(tasks);

    res.json(updatedTask);
  });

  app.delete('/api/tasks/:id', async (req, res) => {
    const id = parseId(req.params.id);
    findTask(tasks, id);

    tasks = tasks.filter((task) => task.id !== id);
    await saveTasks(tasks);

    res.status(204).end();
  });

  // need kaks peavad olema viimased
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
