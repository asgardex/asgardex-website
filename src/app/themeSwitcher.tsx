// app/components/ThemeSwitcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'
import { MdWbSunny as SunIcon, MdNightsStay as MoonIcon } from 'react-icons/md'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark'

  const toggleTheme = () => { setTheme(isDark ? 'light' : 'dark') }

  return (
    <Button onClick={toggleTheme}>
    {isDark ? <SunIcon /> : <MoonIcon />}
  </Button>
  )
}

export default ThemeSwitcher
