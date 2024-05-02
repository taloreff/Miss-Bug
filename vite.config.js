import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: './backend/public',
    emptyOutDir: true,
    assetsDir: './backend/public/assets'
  }
})
