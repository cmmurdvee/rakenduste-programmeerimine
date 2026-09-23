import { Link, useParams } from 'react-router-dom';
import { PageSection } from '../components/PageSection';

export function TaskDetailsPage({ tasks }) {
  const { taskId } = useParams();
  const id = Number(taskId); // url-ist tuleb string, teen numbriks

  const task = tasks.find((item) => item.id === id);

  // kui sellise id-ga taski pole
  if (!task) {
    return (
      <PageSection title="Task not found">
        <p>There is no task with the id "{taskId}".</p>
        <Link to="/tasks">← Back to tasks</Link>
      </PageSection>
    );
  }

  return (
    <PageSection title={task.title}>
      <dl>
        <dt>ID</dt>
        <dd>{task.id}</dd>
        <dt>Status</dt>
        <dd>{task.completed ? 'Completed' : 'Not completed'}</dd>
      </dl>
      <Link to="/tasks">← Back to tasks</Link>
    </PageSection>
  );
}
