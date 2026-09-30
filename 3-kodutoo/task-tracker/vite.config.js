import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // github pages jaoks repo nimi
  base: '/task-tracker/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
