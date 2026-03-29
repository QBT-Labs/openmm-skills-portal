'use client'

import { Copy, Check, Server, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="bg-[#0d0d0d] border border-border rounded-lg overflow-hidden">
      {filename && (
        <div className="bg-secondary/50 px-4 py-2 border-b border-border text-sm text-gray-400">
          {filename}
        </div>
      )}
      <div className="flex items-start justify-between p-4">
        <pre className="text-sm overflow-x-auto flex-1">
          <code className="text-gray-300">{code}</code>
        </pre>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

function CollapsibleSection({ 
  title, 
  icon, 
  children,
  defaultOpen = false 
}: { 
  title: string
  icon: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0 border-t border-border">
          {children}
        </div>
      )}
    </div>
  )
}

export default function MCPSetupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Docs
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Server className="w-8 h-8 text-purple-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">MCP Setup Guide</h1>
        <p className="text-xl text-gray-400">
          Connect OpenMM to your favorite AI client
        </p>
      </div>

      {/* Quick Setup */}
      <section className="mb-12">
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">⚡ Quick Setup (Recommended)</h2>
          <p className="text-gray-300 text-sm mb-4">
            Install, set up your vault, start the server, then configure your client:
          </p>
          <div className="install-box flex items-center justify-between mb-2">
            <code className="text-purple-400 text-sm">npm install -g @qbtlabs/openmm-mcp</code>
            <CopyButton text="npm install -g @qbtlabs/openmm-mcp" />
          </div>
          <div className="install-box flex items-center justify-between mb-2">
            <code className="text-purple-400 text-sm">openmm-init</code>
            <CopyButton text="openmm-init" />
          </div>
          <div className="install-box flex items-center justify-between mb-2">
            <code className="text-purple-400 text-sm">openmm serve</code>
            <CopyButton text="openmm serve" />
          </div>
          <div className="install-box flex items-center justify-between">
            <code className="text-purple-400 text-sm">openmm-mcp --setup</code>
            <CopyButton text="openmm-mcp --setup" />
          </div>
          <p className="text-gray-400 text-sm mt-3">
            <code className="text-purple-400">openmm-mcp --setup</code> writes your client config with <code className="text-purple-400">OPENMM_SOCKET</code>, <code className="text-purple-400">PAYMENT_SERVER</code>, and transport settings — no credentials leave the vault.
          </p>
        </div>
      </section>

      {/* Important Note */}
      <section className="mb-12">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <p className="text-sm text-yellow-300">
            <strong>Important:</strong> Run <code className="bg-yellow-500/20 px-1 rounded">openmm serve</code> before launching your MCP client. The server must be running for the socket connection to work.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-12">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">What is MCP?</h2>
          <p className="text-gray-300 text-sm">
            The <strong>Model Context Protocol (MCP)</strong> is an open standard that allows AI agents to connect to external tools and data sources. 
            OpenMM provides an MCP server that gives your agent access to trading tools across multiple exchanges.
          </p>
        </div>
      </section>

      {/* Client Setup Guides */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Choose Your Client</h2>
        <div className="space-y-4">
          <CollapsibleSection title="Claude Desktop" icon="🤖" defaultOpen>
            <div className="space-y-4 mt-4">
              <p className="text-gray-400 text-sm">
                Run the setup wizard and select <strong>Claude Desktop</strong>:
              </p>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openmm-mcp --setup</code>
                <CopyButton text="openmm-mcp --setup" />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                The wizard writes to <code className="text-purple-400">claude_desktop_config.json</code> using <code className="text-purple-400">node</code> with absolute path — no API keys in config.
              </p>
              <h4 className="font-medium mt-4">After setup:</h4>
              <p className="text-sm text-gray-400">
                Restart Claude Desktop. You should see OpenMM tools available in the tools panel.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Cursor" icon="⚡">
            <div className="space-y-4 mt-4">
              <p className="text-gray-400 text-sm">
                Run the setup wizard and select <strong>Cursor</strong>:
              </p>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openmm-mcp --setup</code>
                <CopyButton text="openmm-mcp --setup" />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                The wizard configures Cursor&apos;s MCP settings automatically.
              </p>
              <h4 className="font-medium mt-4">After setup:</h4>
              <p className="text-sm text-gray-400">
                Restart Cursor or reload the window to activate the MCP server.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="OpenClaw (Recommended)" icon="🦞" defaultOpen>
            <div className="space-y-4 mt-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-green-400 text-sm">
                  ✨ <strong>Best Integration:</strong> OpenClaw provides the most seamless experience with OpenMM skills, running locally on your machine with full MCP support.
                </p>
              </div>
              
              <h4 className="font-medium">Option A: Install Skills via ClawHub (Easiest)</h4>
              <div className="space-y-2">
                <div className="install-box flex items-center justify-between">
                  <code className="text-purple-400 text-sm">clawhub install openmm</code>
                  <CopyButton text="clawhub install openmm" />
                </div>
                <div className="install-box flex items-center justify-between">
                  <code className="text-purple-400 text-sm">clawhub install openmm-exchange-setup</code>
                  <CopyButton text="clawhub install openmm-exchange-setup" />
                </div>
                <div className="install-box flex items-center justify-between">
                  <code className="text-purple-400 text-sm">clawhub install openmm-grid-trading</code>
                  <CopyButton text="clawhub install openmm-grid-trading" />
                </div>
                <div className="install-box flex items-center justify-between">
                  <code className="text-purple-400 text-sm">clawhub install openmm-portfolio</code>
                  <CopyButton text="clawhub install openmm-portfolio" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                This installs OpenMM skills directly into OpenClaw, making all tools available in your sessions.
              </p>
              
              <h4 className="font-medium mt-6">Option B: Configure MCP Server</h4>
              <p className="text-gray-400 text-sm">
                Run the setup wizard and select <strong>Claude Code</strong> (OpenClaw uses the same config):
              </p>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openmm-mcp --setup</code>
                <CopyButton text="openmm-mcp --setup" />
              </div>
              
              <h4 className="font-medium mt-4">Restart the OpenClaw gateway</h4>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openclaw gateway restart</code>
                <CopyButton text="openclaw gateway restart" />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Windsurf" icon="🏄">
            <div className="space-y-4 mt-4">
              <p className="text-gray-400 text-sm">
                Run the setup wizard and select <strong>Windsurf</strong>:
              </p>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openmm-mcp --setup</code>
                <CopyButton text="openmm-mcp --setup" />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                The wizard configures Windsurf&apos;s MCP settings automatically.
              </p>
              <h4 className="font-medium mt-4">After setup:</h4>
              <p className="text-sm text-gray-400">
                Restart Windsurf to connect to the OpenMM MCP server.
              </p>
            </div>
          </CollapsibleSection>
        </div>
      </section>

      {/* Verification */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Verify Your Setup</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-4">
            Once configured, test that OpenMM is working by asking your agent:
          </p>
          <div className="space-y-3">
            <div className="install-box">
              <code className="text-purple-400 text-sm">&quot;Get the BTC/USDT price on MEXC&quot;</code>
            </div>
            <div className="install-box">
              <code className="text-purple-400 text-sm">&quot;Show the ETH/USDT orderbook on Gate.io&quot;</code>
            </div>
            <div className="install-box">
              <code className="text-purple-400 text-sm">&quot;What are my balances on all exchanges?&quot;</code>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-2">Tools not appearing?</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Make sure <code className="text-purple-400">openmm serve</code> is running before you launch your client</li>
              <li>• Restart your AI client after running <code className="text-purple-400">openmm-mcp --setup</code></li>
              <li>• Check that Node.js 18+ is installed and in your PATH</li>
              <li>• Run <code className="text-purple-400">openmm-status</code> to verify the socket is active</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-2">Authentication errors?</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Run <code className="text-purple-400">openmm-exchange list</code> to check configured exchanges</li>
              <li>• Use <code className="text-purple-400">openmm-exchange add mexc</code> to re-enter credentials</li>
              <li>• Check that API trading permissions are enabled on the exchange</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-2">Still having issues?</h3>
            <p className="text-sm text-gray-400">
              Open an issue on{' '}
              <a href="https://github.com/QBT-Labs/openmm-mcp/issues" className="text-purple-400 hover:underline">
                GitHub
              </a>{' '}
              or reach out on{' '}
              <a href="https://x.com/QBTLabs" className="text-purple-400 hover:underline">
                X/Twitter
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Config File Paths */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Config File Paths</h2>
        <p className="text-gray-400 text-sm mb-4">
          The setup wizard writes to these files. Useful for manual editing or debugging:
        </p>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-3 px-4 font-medium">Client</th>
                <th className="text-left py-3 px-4 font-medium">Config File Path</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Cursor</td>
                <td className="py-3 px-4"><code className="text-purple-400">~/.cursor/mcp.json</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Claude Desktop (macOS)</td>
                <td className="py-3 px-4"><code className="text-purple-400 text-xs">~/Library/Application Support/Claude/claude_desktop_config.json</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Claude Desktop (Windows)</td>
                <td className="py-3 px-4"><code className="text-purple-400 text-xs">%APPDATA%/Claude/claude_desktop_config.json</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Claude Code</td>
                <td className="py-3 px-4"><code className="text-purple-400">~/.claude/settings.json</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4">Windsurf</td>
                <td className="py-3 px-4"><code className="text-purple-400">~/.codeium/windsurf/mcp_config.json</code></td>
              </tr>
              <tr>
                <td className="py-3 px-4">OpenClaw</td>
                <td className="py-3 px-4"><code className="text-purple-400">~/.claude/settings.json</code> <span className="text-gray-500">(same as Claude Code)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Ready to Trade</h2>
        <p className="text-gray-400 mb-4">
          Your agent now has access to 30+ trading tools across 4+ exchanges
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/skills"
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm transition-colors"
          >
            Browse Skills
          </Link>
        </div>
      </section>
    </div>
  )
}
