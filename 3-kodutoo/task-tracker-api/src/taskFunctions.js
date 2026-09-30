export function getAllTasks(tasks) {
  // koopia, originaal jääb samaks
  return [...tasks];
}

export function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getCompletedTasks(tasks) {
  return tasks.filter((task) => task.completed);
}

export function getIncompleteTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}
