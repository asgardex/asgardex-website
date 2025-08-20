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
    <Navbar maxWidth="xl">
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <div className="flex items-center justify-between">
              <Image
                src={'/asgardex-logo.avif'}
                alt="Asgardex logotipe"
                width={40}
                height={40}
              />
              <h1
                className={clsx(
                  play.className,
                  'font-bold text-foreground text-2xl uppercase ml-3'
                )}>
                Asgardex
              </h1>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex" justify="end">
        <NavbarItem>
          {mounted && (
            <Button
              isIconOnly
              variant="bordered"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
              className="mr-2 border-default-300 hover:bg-default-100"
              aria-label="Toggle theme">
              <span className="text-lg">
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <Link href={'/installer'}>
            <Button className="bg-primary text-primary-foreground px-8 rounded-full text-lg h-10 hover:bg-primary/90">
              Download
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
