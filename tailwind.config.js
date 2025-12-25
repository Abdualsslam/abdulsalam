/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7E66AC',
                    dark: '#502e91',
                    light: '#9b85c4',
                },
                secondary: '#8F00FF',
                accent: '#00D9FF',
                dark: {
                    DEFAULT: '#0a0a0f',
                    secondary: '#12121a',
                    card: '#1a1a25',
                    'card-hover': '#22222f',
                },
            },
            fontFamily: {
                sf: ['"SF Pro"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                'xl': '20px',
                '2xl': '30px',
            },
            animation: {
                'pulse-slow': 'pulse 8s ease-in-out infinite',
                'bounce-slow': 'bounce 2s infinite',
                'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                },
            },
        },
    },
    plugins: [],
}
