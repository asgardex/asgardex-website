import type { Metadata } from 'next'
import Image from 'next/image'
import clsx from 'clsx'

import { Providers } from './providers'
import { jakarta } from './ui/fonts'
import Header from './ui/Header'
import Footer from './ui/Footer'
import AnimatedBackground from './ui/AnimatedBackground'
import './globals.css'

export const metadata: Metadata = {
  title: 'Asgardex',
  description: 'A Seamless Multi-Chain L1 Exchange at Your Fingertips',
  manifest: '/manifest.json'
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
          className="w-full h-screen fixed -z-20 opacity-5 dark:opacity-2"
          src="/background.avif"
          alt="Abstract background pattern"
          sizes="100vw"
          width={100}
          height={100}
        />
        <AnimatedBackground />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
