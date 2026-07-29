import type { Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'

import { Providers } from './providers'
import { jakarta } from './ui/fonts'
import Header from './ui/Header'
import Footer from './ui/Footer'
import AmbientBackground from './ui/AmbientBackground'
import './globals.css'

const siteName = 'AsgardEX'
const description = 'A Seamless Multi-Chain L1 Exchange at Your Fingertips'
const ogImage = {
  url: '/pools-home.png',
  width: 1024,
  height: 554,
  alt: 'AsgardEX desktop application interface'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://asgardex.com'),
  title: 'Asgardex',
  description,
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName,
    title: 'AsgardEX — Multi-Chain L1 Trading Desktop App',
    description,
    url: '/',
    images: [ogImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AsgardEX — Multi-Chain L1 Trading Desktop App',
    description,
    images: [ogImage.url]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(jakarta.className, 'antialiased', 'bg-background text-foreground')}>
        <Image
          className="w-full h-screen fixed -z-20 opacity-10 dark:opacity-5"
          src="/background.avif"
          alt="Abstract background pattern"
          sizes="100vw"
          width={100}
          height={100}
        />
        <AmbientBackground />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
