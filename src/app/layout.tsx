import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../styles/globals.css'
import { ToastProvider } from '@/provider/ToastProvider'

export const metadata: Metadata = {
  title: 'Web Interface for Log System (React + Tailwind CSS)',
  description: 'To assess your skills in building responsive, accessible UIs using Tailwind CSS and React.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main>
          <ToastProvider>{children}</ToastProvider>
        </main>
        <Footer />
      </body>
    </html>
  )
}
