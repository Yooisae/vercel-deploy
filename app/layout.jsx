import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import BackgroundDecor from '@/components/BackgroundDecor'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Pulse — Personal Dashboard',
  icons: { icon: '/vite.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.variable}>
        <ThemeProvider>
          <div className="min-h-screen relative">
            <BackgroundDecor />
            <Sidebar />
            <main className="ml-20 p-8 relative z-10">
              <Header />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
