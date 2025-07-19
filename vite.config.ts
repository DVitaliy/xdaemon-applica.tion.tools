import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, 'dist/client'),
    emptyOutDir: true
  },
  // ssr: {
  //   noExternal: true
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
