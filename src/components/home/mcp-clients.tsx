'use client'

import Image from 'next/image'

const clients = [
  { name: 'Claude', logo: '/logos/claude.svg' },
  { name: 'Cursor', logo: '/logos/cursor.svg' },
  { name: 'Windsurf', logo: '/logos/windsurf.svg' },
  { name: 'opencode', logo: '/logos/opencode.svg' },
  { name: 'OpenClaw', logo: '/logos/openclaw.svg' },
]

export function MCPClients() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Works with Every MCP Client
          </span>
        </h2>
        <p className="text-gray-400">
          Connect OpenMM to your favorite AI coding assistant via Model Context Protocol
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
        {clients.map((client) => (
          <div key={client.name} className="flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 rounded-2xl overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {client.name}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-8">
        And any other MCP-compatible client
      </p>
    </section>
  )
}
