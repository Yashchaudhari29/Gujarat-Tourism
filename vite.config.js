import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  base: '/',
  resolve:{alias:{'@localization/jsx-runtime':fileURLToPath(new URL('./src/locale/jsx-runtime.js',import.meta.url)), '@localization':fileURLToPath(new URL('./src/locale',import.meta.url))}},
  esbuild: { jsx: 'automatic',jsxImportSource:'@localization' },
  build: { outDir: 'dist', emptyOutDir: true, assetsDir: 'bundles', rollupOptions: { external: ['/assets/three.module.js'], output: { manualChunks: { react: ['react', 'react-dom/client'] } } } }
});
