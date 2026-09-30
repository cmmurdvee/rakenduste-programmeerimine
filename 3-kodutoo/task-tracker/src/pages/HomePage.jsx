import { Link } from 'react-router-dom';
import { PageSection } from '../components/PageSection';

export function HomePage({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <PageSection title="Welcome">
      <p>
        You have completed {completedCount} of {tasks.length} tasks.
      </p>
      <Link to="/tasks">Go to your tasks →</Link>
    </PageSection>
  );
}
