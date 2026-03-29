'use client'

import { Copy, Check, Shield, Terminal, ArrowLeft, ArrowRight, Lock, KeyRound, Activity } from 'lucide-react'
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
      className="p-1.5 hover:bg-white/10 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="bg-[#0d0d0d] border border-border rounded-lg overflow-hidden">
      {label && (
        <div className="bg-secondary/50 px-4 py-2 border-b border-border text-sm text-gray-400">{label}</div>
      )}
      <div className="flex items-center justify-between p-4">
        <pre className="text-sm overflow-x-auto flex-1">
          <code className="text-green-400">{code}</code>
        </pre>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

const steps = [
  {
    num: 1,
    icon: Terminal,
    title: 'Install',
    description: 'Install the OpenMM package globally',
    command: 'npm install -g @qbtlabs/openmm-mcp',
  },
  {
    num: 2,
    icon: Lock,
    title: 'Create Vault',
    description: 'Run the one-time setup wizard to create your encrypted vault, generate a wallet, and add exchange credentials',
    command: 'openmm-init',
  },
  {
    num: 3,
    icon: Activity,
    title: 'Start Server',
    description: 'Start the unified MCP server — run this before launching any AI client',
    command: 'openmm serve',
  },
  {
    num: 4,
    icon: KeyRound,
    title: 'Configure Client',
    description: 'Write the MCP config for your AI client (Claude, Cursor, Windsurf, etc.)',
    command: 'openmm-mcp --setup',
  },
]

const envBlock = {
  MCP_TRANSPORT: 'stdio',
  OPENMM_SOCKET: '/tmp/openmm.sock',
  PAYMENT_SERVER: 'https://mcp.openmm.io',
  X402_TESTNET: 'true',
}

const clientConfigs: { key: string; label: string; filename: string; config: string }[] = [
  {
    key: 'claude-code',
    label: 'Claude Code',
    filename: '~/.claude.json',
    config: JSON.stringify({
      mcpServers: {
        openmm: {
          type: 'stdio',
          command: 'node',
          args: ['<openmm-mcp-path>/dist/index.js'],
          env: envBlock,
        },
      },
    }, null, 2),
  },
  {
    key: 'claude-desktop',
    label: 'Claude Desktop',
    filename: 'claude_desktop_config.json',
    config: JSON.stringify({
      mcpServers: {
        openmm: {
          command: '<path-to-node>',
          args: ['<openmm-mcp-path>/dist/index.js'],
          cwd: '<openmm-mcp-path>/dist',
          env: envBlock,
        },
      },
    }, null, 2),
  },
  {
    key: 'cursor',
    label: 'Cursor',
    filename: '.cursor/mcp.json',
    config: JSON.stringify({
      mcpServers: {
        openmm: {
          type: 'stdio',
          command: 'node',
          args: ['<openmm-mcp-path>/dist/index.js'],
          env: envBlock,
        },
      },
    }, null, 2),
  },
  {
    key: 'windsurf',
    label: 'Windsurf',
    filename: '~/.codeium/windsurf/mcp_config.json',
    config: JSON.stringify({
      mcpServers: {
        openmm: {
          type: 'stdio',
          command: 'node',
          args: ['<openmm-mcp-path>/dist/index.js'],
          env: envBlock,
        },
      },
    }, null, 2),
  },
]

export default function SetupPage() {
  const [selectedClient, setSelectedClient] = useState('claude-code')
  const activeClient = clientConfigs.find((c) => c.key === selectedClient)!

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-4">Setup Guide</h1>
        <p className="text-xl text-gray-400">
          Vault-based setup — your credentials never leave your machine.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-12">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-400 mb-2">Security Model</h3>
            <ul className="text-sm text-green-200/80 space-y-1">
              <li>• All credentials stored in an AES-256-GCM encrypted vault on your machine</li>
              <li>• Vault password is typed once in the terminal, never stored anywhere</li>
              <li>• MCP clients connect via a local IPC socket — no API keys in config files</li>
              <li>• Policy enforcement happens at the socket before any key is touched</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Setup in 4 Steps</h2>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.num} className="relative pl-8 border-l-2 border-purple-500">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                {step.num}
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                <CodeBlock code={step.command} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Generated Config */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Client Config Reference</h2>
        <p className="text-gray-400 text-sm mb-6">
          <code className="text-purple-400">openmm-mcp --setup</code> writes this automatically. Shown here for reference.
        </p>

        <div className="flex gap-1.5 flex-wrap mb-4">
          {clientConfigs.map((client) => (
            <button
              key={client.key}
              onClick={() => setSelectedClient(client.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedClient === client.key
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                  : 'bg-secondary text-gray-400 border border-border hover:text-white'
              }`}
            >
              {client.label}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
            <span className="text-sm text-gray-400 font-mono">{activeClient.filename}</span>
            <CopyButton text={activeClient.config} />
          </div>
          <div className="p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-purple-400 whitespace-pre-wrap">{activeClient.config}</pre>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg space-y-2">
          <p className="text-sm text-yellow-300">
            <strong>Note:</strong> <code className="bg-yellow-500/20 px-1 rounded">openmm-mcp --setup</code> detects your <code className="bg-yellow-500/20 px-1 rounded">node</code> and package paths automatically and writes the correct absolute paths.
          </p>
          <p className="text-sm text-yellow-300/80">
            No API keys, no wallet keys in config — just the socket path and payment server. Credentials stay in the vault.
          </p>
        </div>
      </section>

      {/* Managing Credentials */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Managing Credentials</h2>
        <p className="text-gray-400 text-sm mb-4">
          Exchange credentials live inside your encrypted vault. Use the CLI to manage them:
        </p>
        <div className="space-y-3">
          <CodeBlock code="openmm-exchange list" label="List configured exchanges" />
          <CodeBlock code="openmm-exchange add mexc" label="Add exchange credentials" />
          <CodeBlock code="openmm-exchange remove gateio" label="Remove exchange" />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          See <Link href="/docs/cli" className="text-purple-400 hover:underline">CLI Reference</Link> for all commands including wallet management, policy limits, and vault operations.
        </p>
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
              <div className="text-sm text-gray-400">2-minute guide</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/docs/mcp-setup"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">MCP Setup</div>
              <div className="text-sm text-gray-400">Client-specific guides</div>
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
