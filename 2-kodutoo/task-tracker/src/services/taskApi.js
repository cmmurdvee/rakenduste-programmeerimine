// siit võtan taskid, hiljem tuleb siia node.js api url
const TASKS_URL = `${import.meta.env.BASE_URL}tasks.json`;

export async function getTasks() {
  const response = await fetch(TASKS_URL);

  // fetch ei viska ise errorit 404 ja 500 puhul, pean ise kontrollima
  if (!response.ok) {
    throw new Error(`Could not load tasks (HTTP ${response.status})`);
  }

  return response.json();
}
