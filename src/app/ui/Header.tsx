'use client'
import Image from 'next/image'
import { play } from './fonts'
import Link from 'next/link'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu } from '@nextui-org/react'
import ThemeSwitcher from '../themeSwitcher'

export default function Header () {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return <Navbar shouldHideOnScroll onMenuOpenChange={setMenuOpen}>
    <NavbarContent>
      <NavbarBrand>
        <Link href={'/'} className="flex items-center justify-between">
          <Image src={'/asgardex-logo.avif'} alt={'Asgardex logotipe'} width={40} height={40} />
          <h1 className={`${play.className} font-bold text-asgardex-dark-1000 text-2xl uppercase ml-3`}>Asgardex</h1>
        </Link>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent className='hidden md:flex' justify="end">
      <NavbarItem>
        <Link href={'https://twitter.com/asgardex'} target='_blank'>
          <Image src={'/x-black-logo.avif'} alt={'Asgardex X'} width={24} height={24} />
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={'https://discord.gg/hkeJxHS7d7'} target='_blank'>
          <Image src={'/discord-black-logo.avif'} alt={'Asgardex Discord'} width={24} height={24} />
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={'https://github.com/asgardex/asgardex-desktop/releases'} target='_blank'>
          <Image src={'/github-black-logo.avif'} alt={'Asgardex Discord'} width={24} height={24} />
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={'https://thorchain.org/'} target='_blank'>
          <Image src={'/thorchain-black-logo.avif'} alt={'Thorchain logotipe'} width={24} height={24} />
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={'https://www.mayaprotocol.com/'} target='_blank'>
          <Image src={'/maya-black-logo.avif'} alt={'Maya Protocol logotipe'} width={24} height={24} />
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={'/installer'}>
          <Button className='bg-asgardex-primary-500 px-11 rounded-lg text-lg text-asgardex-dark-1000 h-11'>
            Download
          </Button>
        </Link>
      </NavbarItem>
    </NavbarContent>

    <NavbarMenuToggle
      className="sm:hidden text-asgardex-dark-1000"
      icon={isMenuOpen ? <IconX /> : <IconMenu2 />}
    />

    <NavbarMenu className='h-screen bg-white items-center'>
      <div className='p-4 flex w-full items-center justify-around'>
      <ThemeSwitcher />
        <Link href={'https://twitter.com/asgardex'} target='_blank'>
          <Image src={'/x-black-logo.avif'} alt={'Asgardex X'} width={35} height={35} />
        </Link>
        <Link href={'https://discord.com/invite/XjV3Hnud'} target='_blank'>
          <Image src={'/discord-black-logo.avif'} alt={'Asgardex Discord'} width={35} height={35} />
        </Link>
        <Link href={'https://github.com/asgardex/asgardex-desktop/releases'} target='_blank'>
          <Image src={'/github-black-logo.avif'} alt={'Asgardex Discord'} width={35} height={35} />
        </Link>
        <Link href={'https://thorchain.org/'} target='_blank'>
          <Image src={'/thorchain-black-logo.avif'} alt={'Thorchain logotipe'} width={35} height={35} />
        </Link>
        <Link href={'https://www.mayaprotocol.com/'} target='_blank'>
          <Image src={'/maya-black-logo.avif'} alt={'Maya Protocol logotipe'} width={35} height={35} />
        </Link>
      </div>

      <Link href={'/installer'}>

        <Button className='bg-asgardex-primary-500 px-11 rounded-lg text-lg text-asgardex-dark-1000'>
          Download
        </Button>
      </Link>
    </NavbarMenu>
  </Navbar>
}
