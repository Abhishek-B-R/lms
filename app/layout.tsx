import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider, ThemeProvider } from '@/components/providers'
import ChatBot from '@/components/chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS (Learning Management System)',
  description: 'LMS (Learning Management System)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider dynamic afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ConfettiProvider />
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
        <ChatBot/>
      </html>
    </ClerkProvider>
  )
}
