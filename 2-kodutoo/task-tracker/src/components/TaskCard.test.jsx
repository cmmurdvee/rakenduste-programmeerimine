import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { TaskCard } from "./TaskCard";

// võlts task testi jaoks
const task = { id: 1, title: "Learn JSX", completed: false };

describe("TaskCard", () => {
  test("shows the task title", () => {
    // 1. renderdan komponendi
    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);

    // 2. kontrollin, et pealkiri on ekraanil
    expect(screen.getByText("Learn JSX")).toBeInTheDocument();
  });

  test("calls onToggle when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn(); // võlts funktsioon, mis jätab meelde kas teda kutsuti

    render(<TaskCard task={task} onToggle={handleToggle} onDelete={vi.fn()} />);

    // leian nupu nagu kasutaja (nupu teksti järgi) ja klikin
    await user.click(screen.getByRole("button", { name: "Toggle status" }));

    // kontrollin, et funktsiooni kutsuti 1 kord ja õige id-ga
    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(1);
  });

  // lisatestid
  test("shows Not completed for an unfinished task", () => {
    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText("Not completed")).toBeInTheDocument();
  });

  test("calls onDelete when the delete button is clicked", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(<TaskCard task={task} onToggle={vi.fn()} onDelete={handleDelete} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
