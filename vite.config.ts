/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    server: {
      port: 8083,
      proxy: {
        '/api': {
          target: env.VITE_API_HOST,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '/api'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
  }
})
