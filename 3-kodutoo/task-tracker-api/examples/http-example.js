// näide ilma Expressita
import { createServer } from 'node:http';
import { tasks } from '../src/data/tasks.js';

const PORT = 3000;

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  console.log('--- REQUEST ---');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', url.pathname);
  console.log('Query:', Object.fromEntries(url.searchParams));
  console.log('Headers:', req.headers);

  const match = url.pathname.match(/^\/api\/tasks\/(\d+)$/);
  const task = match ? tasks.find((t) => t.id === Number(match[1])) : undefined;

  if (req.method === 'GET' && task) {
    const body = JSON.stringify(task);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    console.log('--- RESPONSE --- 200', body);
  } else {
    const body = JSON.stringify({ error: 'Task not found' });
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(body);
    console.log('--- RESPONSE --- 404', body);
  }
});

server.listen(PORT, () => {
  console.log(`Example server: http://localhost:${PORT}/api/tasks/2`);
  console.log('Stop with Ctrl + C');
});
