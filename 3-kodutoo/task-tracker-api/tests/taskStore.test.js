import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createApp } from '../src/app.js';
import { createTaskSaver, loadTasks } from '../src/taskStore.js';

const defaultTasks = [{ id: 1, title: 'Learn JSX', completed: true }];

let dir;
let file;

// ajutine kaust, päris andmeid ei puutu
beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'task-tracker-test-'));
  file = join(dir, 'tasks.json');
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe('loadTasks and saveTasks', () => {
  test('missing file gives the default tasks', async () => {
    const tasks = await loadTasks(file, defaultTasks);

    expect(tasks).toEqual(defaultTasks);
    expect(tasks).not.toBe(defaultTasks);
  });

  test('saved tasks can be loaded again', async () => {
    const saveTasks = createTaskSaver(file);
    const tasks = [{ id: 7, title: 'Saved', completed: false }];

    await saveTasks(tasks);

    expect(await loadTasks(file, defaultTasks)).toEqual(tasks);
  });

  test('invalid JSON gives a clear error', async () => {
    await writeFile(file, '{ this is not json');

    await expect(loadTasks(file, defaultTasks)).rejects.toThrow(
      'is not valid JSON',
    );
  });

  test('JSON that is not an array gives an error', async () => {
    await writeFile(file, '{"id": 1}');

    await expect(loadTasks(file, defaultTasks)).rejects.toThrow(
      'must contain an array',
    );
  });

  test('many saves at the same time leave a valid file', async () => {
    const saveTasks = createTaskSaver(file);

    const saves = [];
    for (let i = 1; i <= 20; i++) {
      saves.push(saveTasks([{ id: i, title: `Task ${i}`, completed: false }]));
    }
    await Promise.all(saves);

    const text = await readFile(file, 'utf8');
    expect(JSON.parse(text)).toEqual([
      { id: 20, title: 'Task 20', completed: false },
    ]);
  });
});

describe('API with a file', () => {
  test('tasks survive a restart', async () => {
    const app = createApp({
      initialTasks: await loadTasks(file, defaultTasks),
      saveTasks: createTaskSaver(file),
    });
    await request(app).post('/api/tasks').send({ title: 'Remember me' });

    const restartedApp = createApp({
      initialTasks: await loadTasks(file, defaultTasks),
      saveTasks: createTaskSaver(file),
    });
    const res = await request(restartedApp).get('/api/tasks');

    expect(res.body).toEqual([
      ...defaultTasks,
      { id: 2, title: 'Remember me', completed: false },
    ]);
  });

  test('PATCH and DELETE are saved too', async () => {
    const saveTasks = createTaskSaver(file);
    const app = createApp({ initialTasks: defaultTasks, saveTasks });

    await request(app).post('/api/tasks').send({ title: 'Second' });
    await request(app).patch('/api/tasks/1').send({ completed: false });
    await request(app).delete('/api/tasks/2');

    expect(await loadTasks(file, [])).toEqual([
      { id: 1, title: 'Learn JSX', completed: false },
    ]);
  });

  test('a failed save returns 500 with a generic message', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const app = createApp({
      initialTasks: defaultTasks,
      saveTasks: async () => {
        throw new Error('disk is full');
      },
    });

    const res = await request(app).post('/api/tasks').send({ title: 'X' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Something went wrong' });
    expect(JSON.stringify(res.body)).not.toContain('disk is full');
    spy.mockRestore();
  });
});
