import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

export default defineConfig({
  plugins: [
    react(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({ compiler: true }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://54.180.112.35:8080',
        changeOrigin: true,
        secure: false,
        // 웹소켓 설정
        // ws: true,
      },
    },
  },
});
