import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfoil_game/', // Root domain deployment (prashantkadam.github.io)
  plugins: [
    react(),
    tailwindcss(),
  ],
})
