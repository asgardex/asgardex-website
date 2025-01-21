import type { Metadata } from 'next'
import Image from 'next/image'
import { Providers } from './providers'
import './globals.css'
import { jakarta } from './ui/fonts'
import Header from './ui/Header'
import Footer from './ui/Footer'

export const metadata: Metadata = {
  title: 'Asgardex',
  description: 'Template generated for Kairos'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <Image
          className="w-full h-screen fixed -z-10 opacity-20"
          src="/background.avif"
          alt=""
          sizes="100vw"
          width={100}
          height={100}
        />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
