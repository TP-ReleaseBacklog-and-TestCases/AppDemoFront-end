import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        radius: {
          small: '6px',
          medium: '8px',
          large: '10px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
              DEFAULT: '#4f46e5',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#fdf2f8',
              100: '#fce7f3',
              200: '#fbcfe8',
              300: '#f9a8d4',
              400: '#f472b6',
              500: '#ec4899',
              600: '#db2777',
              700: '#be185d',
              800: '#9d174d',
              900: '#831843',
              DEFAULT: '#db2777',
              foreground: '#ffffff',
            },
            success: {
              50: '#ecfdf5',
              100: '#d1fae5',
              200: '#a7f3d0',
              300: '#6ee7b7',
              400: '#34d399',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
              DEFAULT: '#10b981',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
}
export default config

