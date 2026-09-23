const FILTERS = {
  all: "All",
  completed: "Completed",
  incomplete: "Incomplete",
};

// filtri nupud, aktiivne nupp on sinine
export function TaskFilter({ value, onChange }) {
  return (
    <div className="task-filter" role="group" aria-label="Filter tasks">
      {Object.entries(FILTERS).map(([key, label]) => (
        <button
          key={key}
          type="button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
