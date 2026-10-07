import { tasks } from './src/data/tasks.js';
import {
  getAllTasks,
  getCompletedTasks,
  getTaskById,
} from './src/taskFunctions.js';

console.log('Hello from the Task Tracker API!');
console.log(`Node.js version: ${process.version}`);
console.log('');

const allTasks = getAllTasks(tasks);
for (const task of allTasks) {
  const status = task.completed ? 'done' : 'not done';
  console.log(`${task.id}. ${task.title} (${status})`);
}

console.log('');
console.log('Task with id 2:', getTaskById(tasks, 2));
console.log('Task with id 99:', getTaskById(tasks, 99));
console.log('Completed tasks:', getCompletedTasks(tasks).length);
console.log('Completed in an empty list:', getCompletedTasks([]));
