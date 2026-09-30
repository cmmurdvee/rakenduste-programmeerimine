import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { TaskCard } from './TaskCard';

const task = { id: 1, title: 'Learn JSX', completed: false };

describe('TaskCard', () => {
  test('shows the task title', () => {
    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Learn JSX')).toBeInTheDocument();
  });

  test('calls onToggle when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(<TaskCard task={task} onToggle={handleToggle} onDelete={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Toggle status' }));

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(1);
  });

  test('shows Not completed for an unfinished task', () => {
    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Not completed')).toBeInTheDocument();
  });

  test('calls onDelete when the delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={handleDelete} />);

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
