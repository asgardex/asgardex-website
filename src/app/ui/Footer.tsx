'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Divider } from '@nextui-org/react'
import clsx from 'clsx'

import { play } from './fonts'

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 md:py-12 max-w-7xl mx-auto flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12">
      <Divider className="w-full mb-5" />
      <nav className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <div className="w-full md:w-1/2 md:pr-8">
          <Link href="/">
            <div className="flex items-center mb-4 ">
              <Image
                src={'/asgardex-logo.avif'}
                alt="AsgardEX logo"
                width={40}
                height={40}
              />
              <h1
                className={clsx(
                  play.className,
                  'font-bold text-foreground text-2xl uppercase ml-3'
                )}>
                AsgardEX
              </h1>
            </div>
          </Link>
          <p className="text-sm sm:text-base leading-relaxed mb-4">
            Stay updated with the latest from AsgardEX. Follow us on X, join the
            conversation on Discord, and explore our code on GitHub. For
            detailed insights and updates, don’t forget to check out also{' '}
            <Link
              href="https://twitter.com/THORChain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-asgardex-hyperlink">
              THORChain X
            </Link>{' '}
            and{' '}
            <Link
              href="https://www.mayaprotocol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-asgardex-hyperlink">
              MayaProtocol
            </Link>
            .
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            The AsgardEX Team oversees the operation of this website. Our
            repository is maintained on GitHub under{' '}
            <Link
              href="https://github.com/asgardex/asgardex-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-asgardex-hyperlink">
              asgardex-website
            </Link>
            , where all code is openly available.
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col items-center md:items-end justify-between">
          <div className="flex flex-row items-center justify-center md:justify-end gap-4 mb-4 w-full md:w-auto">
            <Link href={'https://twitter.com/asgardex'} target="_blank" rel="noopener noreferrer">
              <Image
                src={'/x-black-logo.avif'}
                alt="AsgardEX on X"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
            <Link href={'https://discord.gg/AZDtabWFJF'} target="_blank" rel="noopener noreferrer">
              <Image
                src={'/discord-black-logo.avif'}
                alt="AsgardEX Discord"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
            <Link
              href={'https://github.com/asgardex/asgardex-desktop/releases'}
              target="_blank"
              rel="noopener noreferrer">
              <Image
                src={'/github-black-logo.avif'}
                alt="AsgardEX GitHub"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
            <Link href={'https://thorchain.org/'} target="_blank" rel="noopener noreferrer">
              <Image
                src={'/thorchain-black-logo.avif'}
                alt="THORChain logo"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
            <Link href={'https://www.mayaprotocol.com/'} target="_blank" rel="noopener noreferrer">
              <Image
                src={'/maya-black-logo.avif'}
                alt="Maya Protocol logo"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
          </div>
          <p className="text-xs font-normal text-asgardex-dark-600">
            AsgardEX © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </nav>
    </footer>
  )
}
