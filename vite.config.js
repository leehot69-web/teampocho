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
            src: '/logos/logo-paqpocho.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logos/logo-paqpocho.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/logos/logo-paqpocho.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
