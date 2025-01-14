import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({ compiler: true }),
  ],
});
