import { describe, expect, test } from 'vitest';
import {
  getAllTasks,
  getCompletedTasks,
  getTaskById,
} from '../src/taskFunctions.js';

const tasks = [
  { id: 10, title: 'A', completed: true },
  { id: 11, title: 'B', completed: false },
];

describe('task functions', () => {
  test('work with any array', () => {
    expect(getAllTasks(tasks)).toHaveLength(2);
    expect(getTaskById(tasks, 11).title).toBe('B');
    expect(getCompletedTasks(tasks)).toEqual([tasks[0]]);
  });

  test('handle an empty array', () => {
    expect(getAllTasks([])).toEqual([]);
    expect(getTaskById([], 1)).toBeUndefined();
    expect(getCompletedTasks([])).toEqual([]);
  });

  test('return undefined for an unknown id', () => {
    expect(getTaskById(tasks, 999)).toBeUndefined();
  });

  test('do not mutate the input', () => {
    const before = structuredClone(tasks);
    const all = getAllTasks(tasks);
    all.push({ id: 12, title: 'C', completed: false });

    expect(all).not.toBe(tasks);
    expect(tasks).toEqual(before);
  });
});
