import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function loadTasks(filePath, defaultTasks) {
  let text;
  try {
    text = await readFile(filePath, 'utf8');
  } catch (error) {
    // faili pole veel, alustan algandmetest
    if (error.code === 'ENOENT') {
      return structuredClone(defaultTasks);
    }
    throw error;
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // vigast faili üle ei kirjuta, muidu andmed kaovad
    throw new Error(`${filePath} is not valid JSON. Fix or delete the file.`);
  }

  if (!Array.isArray(data)) {
    throw new Error(`${filePath} must contain an array of tasks.`);
  }
  return data;
}

export function createTaskSaver(filePath) {
  // kirjutan järjekorras, et fail sassi ei läheks
  let queue = Promise.resolve();

  return function saveTasks(tasks) {
    const json = JSON.stringify(tasks, null, 2);

    const write = queue.then(async () => {
      await mkdir(dirname(filePath), { recursive: true });
      // enne ajutisse faili, siis rename
      const tempPath = `${filePath}.tmp`;
      await writeFile(tempPath, json);
      await rename(tempPath, filePath);
    });

    queue = write.catch(() => {});
    return write;
  };
}
