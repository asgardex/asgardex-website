'use client'
import Image from 'next/image'
import { play } from './fonts'
import Link from 'next/link'
import { Divider } from '@nextui-org/react'

export default function Footer () {
  return <footer className="p-10 max-w-[1300px] m-auto flex flex-col items-center justify-center mt-10">
    <Divider className='w-full mb-5' />
    <nav className="w-full flex flex-col md:flex-row items-start lg:items-center justify-between">
      <div className='w-full mb-5 md:w-1/2'>
        <Link href={'/'} className="flex items-center mb-4">
          <Image src={'/asgardex-logo.avif'} alt={'Asgardex logotipe'} width={40} height={40} />
          <h1 className={`${play.className} font-bold text-asgardex-dark-1000 text-2xl uppercase ml-3`}>Asgardex</h1>
        </Link>
        <p>Stay updated with the latest from Asgardex. Follow us on X, join the conversation on
          Discord, and explore our code on GitHub. For detailed insights and updates, don’t forget to
          check out also <Link href='https://twitter.com/THORChain' target='_blank' className='text-asgardex-hyperlink'>THORChain X</Link> and <Link href='https://www.mayaprotocol.com/' target='_blank' className='text-asgardex-hyperlink'>MayaProtocol</Link>.</p>
      </div>
      <div className='w-56 flex flex-col items-center justify-between'>
        <div className='flex flex-row w-full items-center justify-between mb-4'>
          <Link href={'https://twitter.com/asgardex'} target='_blank'>
            <Image src={'/x-black-logo.avif'} alt={'Asgardex X'} width={24} height={24} />
          </Link>
          <Link href={'https://discord.com/invite/XjV3Hnud'} target='_blank'>
            <Image src={'/discord-black-logo.avif'} alt={'Asgardex Discord'} width={24} height={24} />
          </Link>
          <Link href={'https://github.com/asgardex/asgardex-desktop/releases'} target='_blank'>
            <Image src={'/github-black-logo.avif'} alt={'Asgardex Discord'} width={24} height={24} />
          </Link>
          <Link href={'https://thorchain.org/'} target='_blank'>
            <Image src={'/thorchain-black-logo.avif'} alt={'Thorchain logotipe'} width={24} height={24} />
          </Link>
          <Link href={'https://www.mayaprotocol.com/'} target='_blank'>
            <Image src={'/maya-black-logo.avif'} alt={'Maya Protocol logotipe'} width={24} height={24} />
          </Link>
        </div>
        <p className='text-xs font-normal text-asgardex-dark-600'>Asgardex © 2023. All right reserved.</p>
      </div>
    </nav>
  </footer>
}
