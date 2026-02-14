import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only use relative base if we are building for production
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
    strictPort: true,
    allowedHosts: true // This allows all hosts, including ngrok tunnels
  }
})



