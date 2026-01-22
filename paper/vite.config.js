import { defineConfig } from 'vite'

export default defineConfig({
  server: {
     allowedHosts: [
      '3029bbbbf472.ngrok-free.app' // Add your specific ngrok host here
      // or allowedHosts: true  for all hosts (don't do in prod, local only!)
    ],
    // Allows the tunnel to access the server
    host: true, 
    // Fixes the "Hot Module Reload" over the tunnel
    hmr: {
      clientPort: 443 
    }
  }
})
