// lisab asjad nagu toBeInTheDocument()
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// iga testi järel tühjendan ekraani, et testid üksteist ei segaks
afterEach(() => {
  cleanup();
});
