import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
    define: {
        'import.meta.env.VITE_SITE_URL': JSON.stringify(process.env.VITE_SITE_URL || loadEnv(mode, process.cwd()).VITE_SITE_URL || 'https://abdulsalam.pro/'),
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
        // Ensure a single React instance (prevents "Invalid hook call" when
        // libraries like slot-text resolve their own react peer copy).
        dedupe: ['react', 'react-dom'],
    },
    server: {
        port: Number(process.env.PORT) || 5173,
        strictPort: false,
    },
}))
