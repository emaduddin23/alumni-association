import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        member: resolve(__dirname, 'member-portal.html'),
        tenant: resolve(__dirname, 'tenant-admin.html'),
      },
    },
  },
});
