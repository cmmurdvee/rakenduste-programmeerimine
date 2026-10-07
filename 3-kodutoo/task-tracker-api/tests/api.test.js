import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';
import { createApp } from '../src/app.js';

const testTasks = [
  { id: 1, title: 'Learn JSX', completed: true },
  { id: 2, title: 'Practise React state', completed: false },
  { id: 3, title: 'Build a Node.js API', completed: false },
];

let app;

// iga test saab värsked andmed
beforeEach(() => {
  app = createApp({ initialTasks: testTasks });
});

describe('GET', () => {
  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/tasks returns all tasks', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(testTasks);
  });

  test('GET /api/tasks?completed=true and false filter tasks', async () => {
    const done = await request(app).get('/api/tasks?completed=true');
    const notDone = await request(app).get('/api/tasks?completed=false');

    expect(done.body.map((task) => task.id)).toEqual([1]);
    expect(notDone.body.map((task) => task.id)).toEqual([2, 3]);
  });

  test('invalid completed value returns 400', async () => {
    const res = await request(app).get('/api/tasks?completed=yes');

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('GET /api/tasks/2 returns one task', async () => {
    const res = await request(app).get('/api/tasks/2');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(testTasks[1]);
  });

  test('unknown task returns 404', async () => {
    const res = await request(app).get('/api/tasks/99');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Task not found' });
  });

  test('invalid id returns 400', async () => {
    const res = await request(app).get('/api/tasks/abc');

    expect(res.status).toBe(400);
  });
});

describe('POST', () => {
  test('creates a valid task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '  Learn Express  ' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 4,
      title: 'Learn Express',
      completed: false,
    });

    const list = await request(app).get('/api/tasks');
    expect(list.body).toHaveLength(4);
  });

  test('rejects an empty title', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '   ' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Title cannot be empty' });

    const list = await request(app).get('/api/tasks');
    expect(list.body).toHaveLength(3);
  });

  test('rejects a missing or non-string title', async () => {
    const missing = await request(app).post('/api/tasks').send({});
    const number = await request(app).post('/api/tasks').send({ title: 42 });

    expect(missing.status).toBe(400);
    expect(number.status).toBe(400);
  });

  test('invalid JSON returns 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Content-Type', 'application/json')
      .send('{ "title": "broken');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Request body must be valid JSON' });
  });
});

describe('PATCH', () => {
  test('updates completed', async () => {
    const res = await request(app)
      .patch('/api/tasks/2')
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 2,
      title: 'Practise React state',
      completed: true,
    });
  });

  test('rejects an invalid update', async () => {
    const res = await request(app)
      .patch('/api/tasks/2')
      .send({ completed: 'yes' });

    expect(res.status).toBe(400);
  });

  test('unknown task returns 404', async () => {
    const res = await request(app)
      .patch('/api/tasks/99')
      .send({ completed: true });

    expect(res.status).toBe(404);
  });
});

describe('DELETE', () => {
  test('removes a task', async () => {
    const res = await request(app).delete('/api/tasks/2');

    expect(res.status).toBe(204);
    expect(res.text).toBe('');

    const after = await request(app).get('/api/tasks/2');
    expect(after.status).toBe(404);
  });

  test('unknown task returns 404', async () => {
    const res = await request(app).delete('/api/tasks/99');

    expect(res.status).toBe(404);
  });
});

describe('other', () => {
  test('unknown route returns 404 JSON', async () => {
    const res = await request(app).get('/api/nope');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Route not found' });
  });

  test('every test starts with fresh data', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.body).toHaveLength(3);
  });

  test('createApp can start with any data', async () => {
    const emptyApp = createApp({ initialTasks: [] });
    const res = await request(emptyApp).get('/api/tasks');

    expect(res.body).toEqual([]);
  });
});
