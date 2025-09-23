'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from '@nextui-org/react'

import { play } from './fonts'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Navbar maxWidth="xl" className="px-2 sm:px-4">
      <NavbarContent className="gap-2">
        <NavbarBrand className="flex-shrink-0">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src={'/asgardex-logo.avif'}
                alt="Asgardex logotipe"
                width={32}
                height={32}
                className="sm:w-10 sm:h-10"
              />
              <h1
                className={clsx(
                  play.className,
                  'font-bold text-foreground text-lg sm:text-2xl uppercase ml-2 sm:ml-3'
                )}>
                Asgardex
              </h1>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex gap-1 sm:gap-2" justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link href={'/getting-started'}>
            <Button variant="light" className="text-foreground hover:bg-default-100 px-2 sm:px-4 text-sm sm:text-base h-8 sm:h-9">
              Guide
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          {mounted && (
            <Button
              isIconOnly
              variant="bordered"
              size="sm"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
              className="border-default-300 hover:bg-default-100 hover:scale-110 transition-all duration-200 ease-in-out min-w-8 w-8 h-8 sm:min-w-10 sm:w-10 sm:h-10"
              aria-label="Toggle theme">
              <span className="text-sm sm:text-lg">
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <Link href={'/installer'}>
            <Button className="bg-gradient-primary text-primary-foreground px-3 sm:px-6 lg:px-8 rounded-full text-sm sm:text-base lg:text-lg h-8 sm:h-9 lg:h-10 hover:shadow-glow hover:scale-105 transition-all duration-300 ease-in-out">
              Download
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
