'use client'

import { Copy, Check, Shield, Key, ArrowLeft, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react'
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

interface Exchange {
  id: string
  name: string
  logo: string
  docsUrl: string
  fields: { key: string; label: string; placeholder: string }[]
}

const exchanges: Exchange[] = [
  {
    id: 'mexc',
    name: 'MEXC',
    logo: '🟢',
    docsUrl: 'https://www.mexc.com/api',
    fields: [
      { key: 'MEXC_API_KEY', label: 'API Key', placeholder: 'mx0v...' },
      { key: 'MEXC_SECRET', label: 'Secret Key', placeholder: 'Your secret key' },
    ],
  },
  {
    id: 'gateio',
    name: 'Gate.io',
    logo: '🔵',
    docsUrl: 'https://www.gate.io/myaccount/api_key_manage',
    fields: [
      { key: 'GATEIO_API_KEY', label: 'API Key', placeholder: 'Your Gate.io API key' },
      { key: 'GATEIO_SECRET', label: 'Secret Key', placeholder: 'Your secret key' },
    ],
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logo: '🟣',
    docsUrl: 'https://www.kraken.com/u/security/api',
    fields: [
      { key: 'KRAKEN_API_KEY', label: 'API Key', placeholder: 'Your Kraken API key' },
      { key: 'KRAKEN_SECRET', label: 'Private Key', placeholder: 'Your private key' },
    ],
  },
  {
    id: 'bitget',
    name: 'Bitget',
    logo: '🟠',
    docsUrl: 'https://www.bitget.com/account/newapi',
    fields: [
      { key: 'BITGET_API_KEY', label: 'API Key', placeholder: 'Your Bitget API key' },
      { key: 'BITGET_SECRET', label: 'Secret Key', placeholder: 'Your secret key' },
      { key: 'BITGET_PASSPHRASE', label: 'Passphrase', placeholder: 'Your API passphrase' },
    ],
  },
]

function StepItem({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="flex-shrink-0 w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-xs">{num}</span>
      <span>{children}</span>
    </li>
  )
}

function NextSteps({ format }: { format: 'env' | 'claude-desktop' | 'claude-code' | 'cursor' }) {
  if (format === 'env') {
    return (
      <ol className="space-y-2 text-sm text-gray-400">
        <StepItem num={1}>Copy the config above</StepItem>
        <StepItem num={2}>Create a <code className="text-purple-400">.env</code> file in your project root</StepItem>
        <StepItem num={3}>Paste and save the credentials</StepItem>
        <StepItem num={4}>Run <code className="text-purple-400">npx openmm balance</code> to verify</StepItem>
      </ol>
    )
  }

  if (format === 'claude-desktop') {
    return (
      <ol className="space-y-2 text-sm text-gray-400">
        <StepItem num={1}>Copy the config above</StepItem>
        <StepItem num={2}>Open Claude Desktop settings (<code className="text-purple-400">⌘ + ,</code>)</StepItem>
        <StepItem num={3}>Navigate to Developer → Edit Config</StepItem>
        <StepItem num={4}>Paste into <code className="text-purple-400">claude_desktop_config.json</code> and save</StepItem>
        <StepItem num={5}>Restart Claude Desktop</StepItem>
      </ol>
    )
  }

  if (format === 'claude-code') {
    return (
      <ol className="space-y-2 text-sm text-gray-400">
        <StepItem num={1}>Copy the config above</StepItem>
        <StepItem num={2}>Open <code className="text-purple-400">~/.claude/settings.json</code></StepItem>
        <StepItem num={3}>Merge the <code className="text-purple-400">mcpServers</code> block into your existing config</StepItem>
        <StepItem num={4}>Save and restart Claude Code</StepItem>
        <StepItem num={5}>Ask: <em className="text-purple-300">&quot;What is my balance on MEXC?&quot;</em></StepItem>
      </ol>
    )
  }

  // cursor
  return (
    <ol className="space-y-2 text-sm text-gray-400">
      <StepItem num={1}>Copy the config above</StepItem>
      <StepItem num={2}>Create <code className="text-purple-400">.cursor/mcp.json</code> in your project root</StepItem>
      <StepItem num={3}>Paste and save the config</StepItem>
      <StepItem num={4}>Restart Cursor or reload the window (<code className="text-purple-400">⌘ + Shift + P</code> → Reload)</StepItem>
      <StepItem num={5}>OpenMM tools will appear in Cursor&apos;s MCP panel</StepItem>
    </ol>
  )
}

export default function SetupPage() {
  const [credentials, setCredentials] = useState<Record<string, string>>({})
  const [selectedExchanges, setSelectedExchanges] = useState<Set<string>>(new Set())
  const [outputFormat, setOutputFormat] = useState<'env' | 'claude-desktop' | 'claude-code' | 'cursor'>('env')

  const toggleExchange = (id: string) => {
    const newSelected = new Set(selectedExchanges)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedExchanges(newSelected)
  }

  const updateCredential = (key: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }))
  }

  const generateEnvFile = () => {
    const lines: string[] = ['# OpenMM Exchange Credentials', '# Generated by OpenMM Setup Wizard', '']
    
    exchanges.forEach((exchange) => {
      if (selectedExchanges.has(exchange.id)) {
        lines.push(`# ${exchange.name}`)
        exchange.fields.forEach((field) => {
          const value = credentials[field.key] || ''
          lines.push(`${field.key}=${value}`)
        })
        lines.push('')
      }
    })

    return lines.join('\n')
  }

  const buildEnvObject = () => {
    const env: Record<string, string> = {}
    exchanges.forEach((exchange) => {
      if (selectedExchanges.has(exchange.id)) {
        exchange.fields.forEach((field) => {
          const value = credentials[field.key] || ''
          if (value) {
            env[field.key] = value
          }
        })
      }
    })
    return env
  }

  const generateClaudeDesktopConfig = () => {
    const config = {
      mcpServers: {
        openmm: {
          command: 'npx',
          args: ['-y', '@qbtlabs/openmm-mcp'],
          env: buildEnvObject(),
        },
      },
    }
    return JSON.stringify(config, null, 2)
  }

  const generateClaudeCodeConfig = () => {
    const config = {
      mcpServers: {
        openmm: {
          command: 'npx',
          args: ['-y', '@qbtlabs/openmm-mcp'],
          env: buildEnvObject(),
        },
      },
    }
    return JSON.stringify(config, null, 2)
  }

  const generateCursorConfig = () => {
    const config = {
      mcpServers: {
        openmm: {
          command: 'npx',
          args: ['-y', '@qbtlabs/openmm-mcp'],
          env: buildEnvObject(),
        },
      },
    }
    return JSON.stringify(config, null, 2)
  }

  const getGeneratedOutput = () => {
    switch (outputFormat) {
      case 'env': return generateEnvFile()
      case 'claude-desktop': return generateClaudeDesktopConfig()
      case 'claude-code': return generateClaudeCodeConfig()
      case 'cursor': return generateCursorConfig()
    }
  }

  const getFileName = () => {
    switch (outputFormat) {
      case 'env': return '.env'
      case 'claude-desktop': return 'claude_desktop_config.json'
      case 'claude-code': return 'settings.json'
      case 'cursor': return '.cursor/mcp.json'
    }
  }

  const generatedOutput = getGeneratedOutput()
  const hasSelectedExchanges = selectedExchanges.size > 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-4">Setup Wizard</h1>
        <p className="text-xl text-gray-400">
          Configure your exchange API credentials for OpenMM.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-500 mb-2">Security Notice</h3>
            <ul className="text-sm text-yellow-200/80 space-y-1">
              <li>• Your credentials are processed locally in your browser only</li>
              <li>• Nothing is sent to our servers — this is a client-side tool</li>
              <li>• Use <strong>read-only API keys</strong> when possible for safety</li>
              <li>• Enable IP whitelisting on your exchange API settings</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Exchange Selection & Credentials */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-400" />
            Select Exchanges
          </h2>
          
          <div className="space-y-4">
            {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                className={`bg-card border rounded-xl p-5 transition-colors cursor-pointer ${
                  selectedExchanges.has(exchange.id)
                    ? 'border-purple-500/50 bg-purple-500/5'
                    : 'border-border hover:border-purple-500/30'
                }`}
                onClick={() => toggleExchange(exchange.id)}
              >
                {/* Exchange Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl transition-colors ${
                      selectedExchanges.has(exchange.id) ? 'bg-purple-500/20' : 'bg-secondary'
                    }`}>
                      {exchange.logo}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold flex items-center gap-2">
                        {exchange.name}
                        {selectedExchanges.has(exchange.id) && (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {exchange.fields.length} credential{exchange.fields.length > 2 ? 's' : 's'} required
                      </div>
                    </div>
                  </div>
                  <a
                    href={exchange.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                  >
                    Get API Key <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Credential Fields (shown when selected) */}
                {selectedExchanges.has(exchange.id) && (
                  <div className="space-y-3 pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
                    {exchange.fields.map((field) => (
                      <div key={field.key}>
                        <label className="text-sm text-gray-400 mb-1 block">
                          {field.label}
                        </label>
                        <input
                          type="password"
                          placeholder={field.placeholder}
                          value={credentials[field.key] || ''}
                          onChange={(e) => updateCredential(field.key, e.target.value)}
                          className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Generated Output */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Config</h2>
            <div className="flex gap-1.5 flex-wrap">
              {([
                { key: 'env', label: '.env' },
                { key: 'claude-desktop', label: 'Claude Desktop' },
                { key: 'claude-code', label: 'Claude Code' },
                { key: 'cursor', label: 'Cursor' },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOutputFormat(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    outputFormat === tab.key
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'bg-secondary text-gray-400 border border-border hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Output Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
              <span className="text-sm text-gray-400 font-mono">
                {getFileName()}
              </span>
              <CopyButton text={generatedOutput} />
            </div>

            {/* Output Content */}
            <div className="p-4 font-mono text-sm overflow-x-auto max-h-96">
              {hasSelectedExchanges ? (
                <pre className="text-purple-400 whitespace-pre-wrap">{generatedOutput}</pre>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <AlertCircle className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>Select at least one exchange to generate config</p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          {hasSelectedExchanges && (
            <div className="mt-6 bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold mb-3">Next Steps:</h3>
              <NextSteps format={outputFormat} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
