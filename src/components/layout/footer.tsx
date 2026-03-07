import Link from 'next/link'
import { Github } from 'lucide-react'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Skills', href: '#skills' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Exchanges', href: '#exchanges' },
      { label: 'Use Cases', href: '#use-cases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#docs' },
      { label: 'MCP Setup', href: '#docs' },
      { label: 'Examples', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'QBT Labs', href: 'https://qbtlabs.io' },
      { label: 'GitHub', href: 'https://github.com/QBT-Labs/openmm-skills-portal' },
      { label: 'X/Twitter', href: 'https://x.com/QBTLabs' },
      { label: 'Discord', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                OpenMM
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              AI-Native Trading Infrastructure
            </p>
            <a
              href="https://github.com/QBT-Labs/openmm-skills-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-sm mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 QBT Labs. MIT License.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
