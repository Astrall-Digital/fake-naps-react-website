import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves from https://<user>.github.io/<repo>/
  base: command === 'build' ? '/fake-naps-react-website/' : '/',
}))
