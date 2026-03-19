import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

export const metadata: Metadata = {
  title: 'OpenMM Skills Portal | AI-Native Trading Infrastructure',
  description: 'Skills, MCP integration, and documentation for OpenMM - open-source market making tools for AI agents.',
  keywords: ['OpenMM', 'AI trading', 'MCP', 'market making', 'crypto', 'skills', 'x402'],
  authors: [{ name: 'QBT Labs', url: 'https://qbtlabs.io' }],
  openGraph: {
    title: 'OpenMM Skills Portal',
    description: 'AI-Native Trading Infrastructure',
    url: 'https://skills.openmm.io',
    siteName: 'OpenMM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenMM Skills Portal',
    description: 'AI-Native Trading Infrastructure',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background antialiased flex flex-col overflow-x-hidden">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
