import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/2024-2-VK-EDU-Frontend-A-Medvedev/' : '/',
  define: {
    'process.env': {
      PUBLIC_URL: command === 'build' ? '/2024-2-VK-EDU-Frontend-A-Medvedev' : '',
    },
  },
}))