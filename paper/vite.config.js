import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: [
      '3029bbbbf472.ngrok-free.app',
      '774d77f9858c.ngrok-free.app'
    ]
  }
})


/*


export default defineConfig({
  server: {
    host: true, // This allows the network URL (192.168.x.x)
    hmr: {
      // Remove 'port: 443' or 'protocol: wss' if they are there!
      host: '192.168.1.67', 
      port: 5173 // Make sure this matches the port Vite is actually using
    }
  }
})

export default defineConfig({
  server: {
     allowedHosts: true,
    // Allows the tunnel to access the server
    host: true, 
    // Fixes the "Hot Module Reload" over the tunnel
    hmr: {
      clientPort: 443 
    }
  }
})

*/