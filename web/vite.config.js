import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Team Pocho App',
        short_name: 'TeamPocho',
        description: 'Somos el mejor equipo de restaurantes de Maracaibo',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/logos/profile-main.jpg', /* Using profile image as temp icon */
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/logos/profile-main.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          },
          {
            src: '/logos/profile-main.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
