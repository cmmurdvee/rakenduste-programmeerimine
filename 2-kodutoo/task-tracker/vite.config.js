import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // github pages jaoks peab olema repo nimi
  base: '/task-tracker/',
});
