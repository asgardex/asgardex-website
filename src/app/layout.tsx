import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'
import { jakarta } from './ui/fonts'
import Header from './ui/Header'
import Footer from './ui/Footer'
export const metadata: Metadata = {
  title: 'Asgardex',
  description: 'Template generated for Kairos'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
