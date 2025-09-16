import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: '#111315',
          foreground: '#ffffff',
          primary: '#23DCC8',
          secondary: '#00CCFF',
          success: '#23DCC8',
          warning: '#F3BA2F',
          danger: '#FF4954',
        }
      },
      light: {
        colors: {
          background: '#ffffff',
          foreground: '#303942',
          primary: '#23DCC8',
          secondary: '#00CCFF',
          success: '#23DCC8',
          warning: '#F3BA2F',
          danger: '#FF4954',
        }
      }
    }
  })],
  theme: {
    extend: {
      colors: {
        // Official Asgardex theme colors from the package
        'asgardex-primary': {
          100: '#e4ffee',
          200: '#beffd5',
          300: '#8bffb9',
          400: '#33ff99',
          500: '#00fb7d',
          600: '#00f568',
          700: '#00e35c',
          800: '#00ce4e',
          900: '#00bc42',
          950: '#00992c'
        },
        'asgardex-secondary': {
          100: '#dff7ff',
          200: '#ace9fe',
          300: '#70dbfe',
          400: '#00ccff',
          500: '#00c0ff',
          600: '#00b4ff',
          700: '#00a6f4',
          800: '#0093e1',
          900: '#0081cd',
          950: '#0061ac'
        },
        'asgardex-gray': {
          100: '#f7f7f7',
          200: '#eeeeee',
          300: '#e2e2e2',
          400: '#d0d0d0',
          500: '#ababab',
          600: '#8a8a8a',
          700: '#636363',
          800: '#505050',
          900: '#323232',
          950: '#121212'
        },
        'asgardex-dark': {
          100: '#F3F4F4',
          200: '#d1d5da',
          300: '#b4b9c2',
          400: '#969dab',
          500: '#a9b3be',
          600: '#89939d',
          700: '#616b75',
          800: '#4e5761',
          900: '#303942',
          950: '#101921'
        },
        // Theme-specific colors
        'midgard-turquoise': '#23DCC8',
        'bifrost-blue': '#00CCFF',
        'yggdrasil-green': '#33ff99',
        'flash-orange': '#F3BA2F',
        'surtr-red': '#FF4954',
        'asgardex-bg-light': '#ffffff',
        'asgardex-bg-dark': '#111315',
        'asgardex-hyperlink': '#0070E0',
        white: '#ffffff',
        transparent: 'transparent'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(9.34deg, #23DCC8 19.28%, #00CCFF 106.03%)',
        'gradient-primary-dark': 'linear-gradient(9.34deg, #1bb2a3 19.28%, #00a3cc 106.03%)',
      }
    }
  }
}
export default config
