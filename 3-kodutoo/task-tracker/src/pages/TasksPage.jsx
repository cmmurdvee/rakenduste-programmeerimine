import { PageSection } from '../components/PageSection';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

export function TasksPage({ tasks, onAddTask, onToggle, onDelete }) {
  return (
    <>
      <PageSection title="Add a task">
        <TaskForm onAddTask={onAddTask} />
      </PageSection>

      <PageSection title="My tasks">
        <TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} />
      </PageSection>
    </>
  );
}
