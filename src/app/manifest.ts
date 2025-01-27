import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shop',
    short_name: 'Shop',
    description: 'A shop',
    start_url: '/',
    scope: '.',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: "portrait",
    screenshots: [
        {
            src: "./img/desktop_view.png",
            sizes: "1662x955",
            type: "image/png",
            form_factor: "narrow",
            label: "Homescreen of Shop on mobile device"
        },
        {
            src: "./img/desktop_view.png",
            sizes: "1662x955",
            type: "image/png",
            form_factor: "wide",
            label: "Homescreen of Shop on desktop device"
        }
      ],
    
    icons: [
      {
        src: './favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
        purpose: 'any'
      },
        {
            src: './favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
            purpose: 'any'
        },
        {
            src: './favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any'
        },
        {
            src: './icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
        },

    ],
  }
}