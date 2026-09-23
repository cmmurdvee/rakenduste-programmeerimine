import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // github pages jaoks peab olema repo nimi
  base: "/task-tracker/",
  // testide seaded (vitest loeb neid siit)
  test: {
    environment: "jsdom", // võlts brauser, et komponente saaks renderdada
    setupFiles: "./src/setupTests.js", // see fail käivitub enne teste
  },
});
