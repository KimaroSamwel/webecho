import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port for development server
  },
  build: {
    outDir: 'dist', // Specify the output directory for the production build
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
