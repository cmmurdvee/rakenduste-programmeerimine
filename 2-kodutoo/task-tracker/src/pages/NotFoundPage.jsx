import { Link } from "react-router-dom";
import { PageSection } from "../components/PageSection";

export function NotFoundPage() {
  return (
    <PageSection title="Page not found">
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go home bro</Link>
    </PageSection>
  );
}
