'use client'

import { Copy, Check, Terminal, ArrowRight, Shield, Lock, KeyRound, Activity, Wallet, Scale, Database } from 'lucide-react'
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
      className="p-2 hover:bg-white/10 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700">
      {label && (
        <div className="px-4 py-2 border-b border-gray-700 text-xs text-gray-400">{label}</div>
      )}
      <div className="flex items-center justify-between p-4">
        <pre className="text-sm overflow-x-auto">
          <code className="text-green-400">{code}</code>
        </pre>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

const clientConfigs = [
  { client: 'Claude Desktop', path: '~/Library/Application Support/Claude/claude_desktop_config.json' },
  { client: 'Claude Code', path: '~/.claude.json' },
  { client: 'Cursor', path: '.cursor/mcp.json' },
  { client: 'Windsurf', path: '~/.codeium/windsurf/mcp_config.json' },
]

const supportedExchanges = ['mexc', 'gateio', 'bitget', 'kraken', 'binance', 'coinbase', 'okx']

export default function CLIPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Docs
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-6 h-6 text-purple-400" />
          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">CLI Reference</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">OpenMM CLI</h1>
        <p className="text-xl text-gray-400">
          One command to set up. One command to start.<br />
          Works with every MCP client.
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
        <div className="space-y-3">
          <CodeBlock code="npm install -g @qbtlabs/openmm-mcp" label="Install" />
          <CodeBlock code="openmm-init    # one-time setup wizard" label="Setup" />
          <CodeBlock code="openmm serve   # start before launching Claude" label="Start" />
        </div>
      </section>

      {/* Multi-Client Config Table */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Client Configuration</h2>
        <p className="text-gray-400 text-sm mb-4">
          All clients use the same config &mdash; just <code className="text-purple-400 bg-purple-500/20 px-1 rounded">OPENMM_SOCKET</code>, no credentials.
        </p>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-3 px-4 font-medium">Client</th>
                <th className="text-left py-3 px-4 font-medium">Config File</th>
              </tr>
            </thead>
            <tbody>
              {clientConfigs.map((row, i) => (
                <tr key={row.client} className={i < clientConfigs.length - 1 ? 'border-b border-border/50' : ''}>
                  <td className="py-3 px-4">{row.client}</td>
                  <td className="py-3 px-4">
                    <code className="text-purple-400 text-xs">{row.path}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Command Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Command Reference</h2>
        <div className="space-y-8">

          {/* openmm-init */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <KeyRound className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm-init</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">One-time setup wizard. Creates your encrypted vault, generates a wallet, and optionally adds exchange credentials.</p>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Options:</p>
              <div className="bg-secondary/50 rounded-lg p-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">--chain</td>
                      <td className="py-1 text-gray-400"><code className="text-gray-300">base</code> | <code className="text-gray-300">base-sepolia</code> (default: <code className="text-gray-300">base-sepolia</code>)</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">--import 0x...</td>
                      <td className="py-1 text-gray-400">Import an existing wallet by private key</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">--no-exchanges</td>
                      <td className="py-1 text-gray-400">Skip exchange credential setup</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* openmm serve */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm serve</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Start the unified MCP server. Run this before launching any MCP client.</p>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Terminal output:</p>
              <div className="bg-[#0d0d0d] rounded-lg border border-gray-700 p-4">
                <pre className="text-sm text-gray-300 leading-relaxed"><code>{`$ openmm serve
Enter vault password: ••••••••

✅ Vault unlocked
✅ Wallet loaded  0x1a2B...9fE4
✅ Exchanges       3 connected (mexc, gateio, bitget)
✅ Policy          max 0.1 ETH/tx, 1.0 ETH/day
✅ Socket          /tmp/openmm.sock (mode 0600)

Ready — waiting for MCP connections...`}</code></pre>
              </div>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-300">
                <strong>Note:</strong> Password is typed once in the terminal, never stored anywhere &mdash; not in a file, not in an environment variable.
              </p>
            </div>
          </div>

          {/* openmm-status */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm-status</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Health check. No password required &mdash; just reads the socket.</p>
            <div className="bg-[#0d0d0d] rounded-lg border border-gray-700 p-4">
              <pre className="text-sm text-gray-300 leading-relaxed"><code>{`$ openmm-status

Vault       ~/.openmm/vault.enc
Wallet      0x1a2B...9fE4
Exchanges   3 connected
Socket      /tmp/openmm.sock ● active`}</code></pre>
            </div>
          </div>

          {/* openmm-exchange */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm-exchange</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Manage exchange API credentials inside the encrypted vault.</p>
            <div className="space-y-3 mb-4">
              <CodeBlock code="openmm-exchange list" label="List configured exchanges" />
              <CodeBlock code="openmm-exchange add mexc" label="Add exchange credentials" />
              <CodeBlock code="openmm-exchange remove gateio" label="Remove exchange" />
            </div>
            <p className="text-sm text-gray-500">
              Supported: {supportedExchanges.map((ex, i) => (
                <span key={ex}>
                  <code className="text-purple-400">{ex}</code>
                  {i < supportedExchanges.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </div>

          {/* openmm-wallet */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm-wallet</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">View and manage the on-chain wallet stored in your vault.</p>
            <div className="space-y-3 mb-4">
              <CodeBlock code="openmm-wallet info" label="Show wallet address and chain" />
              <CodeBlock code="openmm-wallet set" label="Set a new wallet" />
              <CodeBlock code='openmm-wallet export   # requires "I understand" confirmation' label="Export private key" />
            </div>
          </div>

          {/* openmm-policy */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm-policy</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Configure spending limits. Policies are enforced at the socket level before any key is touched.</p>
            <div className="space-y-3 mb-4">
              <CodeBlock code="openmm-policy show" label="Show current limits" />
              <CodeBlock code="openmm-policy set max-per-tx 0.1" label="Set per-transaction limit" />
              <CodeBlock code="openmm-policy set max-per-day 1.0" label="Set daily limit" />
              <CodeBlock code="openmm-policy set allowed-chains base,base-sepolia" label="Restrict chains" />
              <CodeBlock code="openmm-policy reset" label="Reset to defaults" />
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                Policy violations return <code className="bg-purple-500/20 px-1 rounded">POLICY_REJECTED</code> to the MCP client. The private key is never reached.
              </p>
            </div>
          </div>

          {/* openmm-vault */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold font-mono text-purple-400">openmm-vault</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Advanced vault management. Most users only need <code className="text-purple-400">openmm-init</code>.</p>
            <div className="mb-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">init</td>
                      <td className="py-1 text-gray-400">Create a new vault</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">info</td>
                      <td className="py-1 text-gray-400">Show vault metadata</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">list</td>
                      <td className="py-1 text-gray-400">List entries in the vault</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">add</td>
                      <td className="py-1 text-gray-400">Add an entry</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">remove</td>
                      <td className="py-1 text-gray-400">Remove an entry</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">change-password</td>
                      <td className="py-1 text-gray-400">Re-encrypt with a new password</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 font-mono text-purple-400 whitespace-nowrap">destroy</td>
                      <td className="py-1 text-gray-400">Permanently delete the vault</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Security Model */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-semibold">Security Model</h2>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong className="text-white">AES-256-GCM vault</strong> at <code className="text-purple-400 bg-purple-500/20 px-1 rounded">~/.openmm/vault.enc</code>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <KeyRound className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong className="text-white">Password: interactive terminal only</strong> &mdash; never in any file or environment variable
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong className="text-white">Socket</strong> <code className="text-purple-400 bg-purple-500/20 px-1 rounded">/tmp/openmm.sock</code> mode <code className="text-purple-400 bg-purple-500/20 px-1 rounded">0600</code> &mdash; socket existence = authenticated
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong className="text-white">Policy checked before key is touched</strong> &mdash; <code className="text-purple-400 bg-purple-500/20 px-1 rounded">POLICY_REJECTED</code> returned on violation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">
                <strong className="text-white">Private key never enters any MCP client</strong> process memory
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">No passwords. No API keys. Just the socket path &mdash; proof that you already authenticated.</p>
          <CodeBlock
            code={`// ~/.claude.json
{
  "mcpServers": {
    "openmm": {
      "command": "openmm-mcp",
      "env": {
        "OPENMM_SOCKET": "/tmp/openmm.sock"
      }
    }
  }
}`}
            label="claude.json"
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/docs/quickstart"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">Quick Start</div>
              <div className="text-sm text-gray-400">2-minute setup</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/docs/mcp-setup"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">MCP Setup</div>
              <div className="text-sm text-gray-400">Configure AI clients</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/skills"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">Browse Skills</div>
              <div className="text-sm text-gray-400">Skill packages</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
        </div>
      </section>
    </div>
  )
}
