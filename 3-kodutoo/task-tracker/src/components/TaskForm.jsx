import { useState } from 'react';
import './TaskForm.css';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    setTitle(event.target.value);
    if (error) setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault(); // muidu leht laeb uuesti

    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      setError('Task title cannot be empty.');
      return;
    }

    try {
      await onAddTask(trimmedTitle);
      setTitle('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'task-title-error' : undefined}
        />
      </div>
      <button type="submit">Add task</button>
      {error && (
        <p id="task-title-error" className="task-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
