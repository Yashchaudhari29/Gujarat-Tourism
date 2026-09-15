import { defineConfig } from 'vite';
export default defineConfig({
  base: '/',
  resolve:{alias:{'@localization':new URL('./src/locale',import.meta.url).pathname.replace(/^\/(\w:)/,'$1')}},
  esbuild: { jsx: 'automatic',jsxImportSource:'@localization' },
  build: { outDir: 'dist', emptyOutDir: true, assetsDir: 'bundles', rollupOptions: { external: ['/assets/three.module.js'], output: { manualChunks: { react: ['react', 'react-dom/client'] } } } }
});
