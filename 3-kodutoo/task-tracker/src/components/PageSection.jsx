import './PageSection.css';

export function PageSection({ title, children }) {
  return (
    <section className="page-section">
      <h2 className="page-section__title">{title}</h2>
      {children}
    </section>
  );
}
