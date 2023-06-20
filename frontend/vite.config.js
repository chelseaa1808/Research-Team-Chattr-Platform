import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {manifest: true},
  base: process.env.mode === 'production' ? '/static/' : '/',
  plugins: [react()],
})
