import { defineConfig } from 'vite';

export default defineConfig({
  base: '/mauve-co/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        404: './404.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
