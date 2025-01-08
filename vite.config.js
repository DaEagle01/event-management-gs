import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ReactCompiler from "babel-plugin-react-compiler"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [ReactCompiler]
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  }
})