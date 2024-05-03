import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
      format: {
        comments: false,
      },
    },
  },
  define: {
    'process.env.VITE_KAKAO_RESTAPI_KEY': '52329a0a112266267bafd3864529e810',
    'process.env.VITE_API_BASE_URL': 'https://prod.dongnaebangnae.com',
    'process.env.VITE_KAKAO_SDK_KEY': '82a3494b887471377dd6b85ea63981a0',
    'process.env.VITE_KAKAO_REDIRECT_URI':
      'https://prod.dongnaebangnae.com/api/user/kakao/callback',
  },
});
