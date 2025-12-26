import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Prayas School',
        short_name: 'Prayas',
        description: 'Nurturing Young Minds for a Brighter Future',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/WhatsApp_Image_2025-12-26_at_10.51.54-removebg-preview.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/WhatsApp_Image_2025-12-26_at_10.51.54-removebg-preview.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
