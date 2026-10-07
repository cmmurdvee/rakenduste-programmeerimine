// backendi aadress (.env failist)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new Error('Could not reach the server. Is the backend running?');
  }

  // fetch ei viska ise errorit 404 ja 500 puhul
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || `Request failed (HTTP ${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

function jsonBody(method, data) {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

export function getTasks() {
  return request('/api/tasks');
}

export function createTask(title) {
  return request('/api/tasks', jsonBody('POST', { title }));
}

export function updateTask(id, changes) {
  return request(`/api/tasks/${id}`, jsonBody('PATCH', changes));
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}
