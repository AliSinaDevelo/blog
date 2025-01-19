import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevBlog - Software Engineering Insights',
  description: 'A blog for software engineers featuring tech insights, tutorials, and coding best practices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color="#2563eb" showSpinner={false} />
          <div className="container min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <div className="wrapper py-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
