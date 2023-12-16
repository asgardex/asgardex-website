import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  plugins: [nextui()],
  theme: {
    colors: {
      'asgardex-primary': {
        100: '#e4ffee',
        200: '#BEFFD5',
        300: '#8BFFB9',
        400: '#33FF98',
        500: '#00FB7D',
        600: '#00F568',
        700: '#00E35C',
        800: '#00CE4E',
        900: '#00BC42',
        1000: '#00992C'
      },
      'asgardex-secondary': {
        100: '#DFF7FF',
        200: '#ACE9FF',
        300: '#70DBFE',
        400: '#00CCFF',
        500: '#00C0FF',
        600: '#00B4FF',
        700: '#00A6F4',
        800: '#0093E1',
        900: '#0180CB',
        1000: '#0061AC'
      },
      'asgardex-gray': {
        100: '#F7F7F7',
        200: '#EEEEEE',
        300: '#E2E2E2',
        400: '#D0D0D0',
        500: '#ABABAB',
        600: '#8A8A8A',
        700: '#636363',
        800: '#505050',
        900: '#323232',
        1000: '#121212'
      },
      'asgardex-dark': {
        100: '#F3F4F4',
        200: '#D1D5DA',
        300: '#B4B9C1',
        400: '#969DAB',
        500: '#A9B3BE',
        600: '#89939D',
        700: '#616B75',
        800: '#4E5761',
        900: '#303941',
        1000: '#101921'
      },
      'asgardex-hyperlink': '#0070E0',
      white: '#ffffff',
      transparent: 'transparent'

    },
    backgroundImage: () => ({
      'gradient-primary': 'linear-gradient(to right, #33FF99 , #00B4FF)'
    })
  }
}
export default config
