import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    assetsDir: './backend/public/assets',
    outDir: './backend/public',
    emptyOutDir: true,
  }
})
