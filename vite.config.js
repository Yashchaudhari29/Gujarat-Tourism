import { defineConfig } from 'vite';
export default defineConfig({
  base: '/',
  esbuild: { jsx: 'automatic' },
  build: { outDir: 'dist', emptyOutDir: true, assetsDir: 'bundles', rollupOptions: { external: ['/assets/three.module.js'], output: { manualChunks: { react: ['react', 'react-dom/client'] } } } }
});
