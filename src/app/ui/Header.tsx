'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from '@nextui-org/react'

import { play } from './fonts'

export default function Header() {
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
                  'font-bold invert text-asgardex-dark-1000 text-2xl uppercase ml-3'
                )}>
                Asgardex
              </h1>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex" justify="end">
        <NavbarItem>
          <Link href={'/installer'}>
            <Button className="bg-asgardex-primary-500 px-8 rounded-full text-lg text-asgardex-dark-1000 h-10">
              Download
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
