import type { Metadata } from 'next'
import '@/styles/globals.css'

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
      <body className="min-h-screen bg-background antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
