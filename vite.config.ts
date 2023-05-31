import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@layouts': path.resolve(__dirname, './src/layouts/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@': path.resolve(__dirname, './src/'),
    },
  },
  plugins: [react()],
  server: {
    open: true,
  },
});
