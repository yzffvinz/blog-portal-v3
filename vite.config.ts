/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8083,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     // target: 'https://liuwenzhe.com',
    //     changeOrigin: true,
    //     rewrite: (p) => p.replace(/^\/api/, '/api'),
    //   },
    // },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
