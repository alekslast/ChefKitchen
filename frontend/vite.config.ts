import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';





// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    host: 'localhost', // или используйте '0.0.0.0'
    port: 3001,
    // hmr: {
    //   overlay: false,
    //   protocol: 'https',
    //   host: 'localhost',
    // },
    hmr: false,
  },
})
