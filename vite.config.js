import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createContactHandler } from './server/contact-handler.mjs';

const contactApi = (env) => ({
  name: 'zexton-contact-api',
  configureServer(server) {
    server.middlewares.use(createContactHandler(env));
  },
  configurePreviewServer(server) {
    server.middlewares.use(createContactHandler(env));
  },
});

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  return {
    plugins: [react(), contactApi(env)],
  };
});
