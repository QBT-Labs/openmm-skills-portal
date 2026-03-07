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

const claudeDesktopConfig = `{
  "mcpServers": {
    "openmm": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-mcp"],
      "env": {
        "MEXC_API_KEY": "your-api-key",
        "MEXC_SECRET": "your-secret"
      }
    }
  }
}`

const cursorConfig = `{
  "mcpServers": {
    "openmm": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-mcp"],
      "env": {
        "MEXC_API_KEY": "your-api-key",
        "MEXC_SECRET": "your-secret"
      }
    }
  }
}`

const openClawConfig = `# Add to your ~/.openclaw/config.yaml

mcp_servers:
  openmm:
    command: npx
    args:
      - "-y"
      - "@qbt-labs/openmm-mcp"
    env:
      MEXC_API_KEY: your-api-key
      MEXC_SECRET: your-secret`

const windsurfConfig = `{
  "mcpServers": {
    "openmm": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-mcp"],
      "env": {
        "MEXC_API_KEY": "your-api-key",
        "MEXC_SECRET": "your-secret"
      }
    }
  }
}`

const envExample = `# Exchange API Keys (add to your shell profile or .env)

# MEXC
export MEXC_API_KEY="your-mexc-api-key"
export MEXC_SECRET="your-mexc-secret"

# Gate.io
export GATEIO_API_KEY="your-gateio-api-key"
export GATEIO_SECRET="your-gateio-secret"

# Bitget
export BITGET_API_KEY="your-bitget-api-key"
export BITGET_SECRET="your-bitget-secret"
export BITGET_PASSPHRASE="your-bitget-passphrase"

# Kraken
export KRAKEN_API_KEY="your-kraken-api-key"
export KRAKEN_SECRET="your-kraken-secret"`

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
                Claude Desktop supports MCP servers via the <code className="text-purple-400">claude_desktop_config.json</code> file.
              </p>
              
              <h4 className="font-medium">1. Locate your config file</h4>
              <ul className="text-sm text-gray-400 ml-4 space-y-1">
                <li>• <strong>macOS:</strong> <code className="text-purple-400">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
                <li>• <strong>Windows:</strong> <code className="text-purple-400">%APPDATA%\Claude\claude_desktop_config.json</code></li>
              </ul>
              
              <h4 className="font-medium mt-4">2. Add the OpenMM server</h4>
              <CodeBlock code={claudeDesktopConfig} filename="claude_desktop_config.json" />
              
              <h4 className="font-medium mt-4">3. Restart Claude Desktop</h4>
              <p className="text-sm text-gray-400">
                After saving the config, restart Claude Desktop. You should see the OpenMM tools available in the tools panel.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Cursor" icon="⚡">
            <div className="space-y-4 mt-4">
              <p className="text-gray-400 text-sm">
                Cursor supports MCP servers through its settings configuration.
              </p>
              
              <h4 className="font-medium">1. Open Cursor Settings</h4>
              <p className="text-sm text-gray-400">
                Go to <strong>Cursor Settings → Features → MCP Servers</strong>
              </p>
              
              <h4 className="font-medium mt-4">2. Add the OpenMM configuration</h4>
              <CodeBlock code={cursorConfig} filename="MCP Server Configuration" />
              
              <h4 className="font-medium mt-4">3. Reload Cursor</h4>
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
              
              <h4 className="font-medium">Option A: Install as a Skill (Easiest)</h4>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openclaw skills add qbt-labs/openmm</code>
                <CopyButton text="openclaw skills add qbt-labs/openmm" />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                This automatically configures OpenMM and makes all tools available in your sessions.
              </p>
              
              <h4 className="font-medium mt-6">Option B: Manual MCP Server Config</h4>
              <p className="text-gray-400 text-sm">
                Add to your OpenClaw config file:
              </p>
              <CodeBlock code={openClawConfig} filename="~/.openclaw/config.yaml" />
              
              <h4 className="font-medium mt-4">2. Set your exchange API keys</h4>
              <p className="text-sm text-gray-400">
                Add to your shell profile (~/.zshrc or ~/.bashrc):
              </p>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">export MEXC_API_KEY=&quot;your-key&quot; MEXC_SECRET=&quot;your-secret&quot;</code>
                <CopyButton text='export MEXC_API_KEY="your-key" MEXC_SECRET="your-secret"' />
              </div>
              
              <h4 className="font-medium mt-4">3. Restart the OpenClaw gateway</h4>
              <div className="install-box flex items-center justify-between">
                <code className="text-purple-400 text-sm">openclaw gateway restart</code>
                <CopyButton text="openclaw gateway restart" />
              </div>
              
              <h4 className="font-medium mt-4">4. Verify it works</h4>
              <p className="text-sm text-gray-400">
                Ask your agent: <code className="text-purple-400">&quot;Get my MEXC balance&quot;</code> or <code className="text-purple-400">&quot;Show BTC/USDT price&quot;</code>
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Windsurf" icon="🏄">
            <div className="space-y-4 mt-4">
              <p className="text-gray-400 text-sm">
                Windsurf (Codeium&apos;s IDE) supports MCP through its configuration file.
              </p>
              
              <h4 className="font-medium">1. Open Windsurf settings</h4>
              <p className="text-sm text-gray-400">
                Navigate to <strong>Settings → Cascade → MCP Servers</strong>
              </p>
              
              <h4 className="font-medium mt-4">2. Add the OpenMM server</h4>
              <CodeBlock code={windsurfConfig} filename="MCP Configuration" />
              
              <h4 className="font-medium mt-4">3. Restart Windsurf</h4>
              <p className="text-sm text-gray-400">
                Reload Windsurf to connect to the OpenMM MCP server.
              </p>
            </div>
          </CollapsibleSection>
        </div>
      </section>

      {/* Local MCP Server */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Run MCP Server Locally</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-4">
            Want full control? Clone OpenMM and run the MCP server on your own machine:
          </p>
          
          <h4 className="font-medium mb-2">1. Clone and build</h4>
          <CodeBlock code={`git clone https://github.com/3rd-Eye-Labs/OpenMM.git
cd OpenMM
npm install
npm run build`} filename="Terminal" />
          
          <h4 className="font-medium mt-4 mb-2">2. Configure environment</h4>
          <CodeBlock code={`cp .env.example .env
# Edit .env with your API keys`} filename="Terminal" />
          
          <h4 className="font-medium mt-4 mb-2">3. Install globally</h4>
          <CodeBlock code={`npm install -g .
openmm --help`} filename="Terminal" />
          
          <h4 className="font-medium mt-4 mb-2">4. Use with any MCP client</h4>
          <p className="text-sm text-gray-400">
            Point your AI client to use the local <code className="text-purple-400">openmm</code> command instead of npx.
          </p>
          
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400">
              💡 <strong>Benefits of self-hosting:</strong> Full privacy, no external dependencies, custom modifications, faster startup time.
            </p>
          </div>
        </div>
      </section>

      {/* Environment Variables */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Exchange API Keys</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-4">
            To enable trading operations, you&apos;ll need to provide API keys for your exchanges. 
            Market data tools work without authentication.
          </p>
          <CodeBlock code={envExample} filename=".env or shell profile" />
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              ⚠️ <strong>Security Note:</strong> Never commit API keys to version control. 
              Use environment variables or a secrets manager.
            </p>
          </div>
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
              <li>• Make sure you&apos;ve restarted your AI client after adding the config</li>
              <li>• Check that Node.js 18+ is installed and in your PATH</li>
              <li>• Verify the JSON syntax in your configuration file</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-2">Authentication errors?</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Verify your API keys are correct and active</li>
              <li>• Check that API trading permissions are enabled on the exchange</li>
              <li>• Ensure environment variables are properly exported</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-2">Still having issues?</h3>
            <p className="text-sm text-gray-400">
              Open an issue on{' '}
              <a href="https://github.com/QBT-Labs/openmm-skills-portal/issues" className="text-purple-400 hover:underline">
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

      {/* Next Steps */}
      <section className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Ready to Trade</h2>
        <p className="text-gray-400 mb-4">
          Your agent now has access to 30+ trading tools across 4+ exchanges
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/#skills"
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm transition-colors"
          >
            Browse Skills
          </Link>
          <Link
            href="/#pricing"
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  )
}
