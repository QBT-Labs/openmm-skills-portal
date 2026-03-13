'use client'

const mcpClients = [
  {
    name: 'Claude',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" opacity="0.3"/>
        <path d="M17.5 8.5L12 3 6.5 8.5l1.4 1.4L11 6.8V15h2V6.8l3.1 3.1 1.4-1.4zM12 17c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5z"/>
      </svg>
    ),
    svgLogo: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10">
      <rect width="120" height="120" rx="24" fill="#D97757"/>
      <path d="M86.1 56.4c0-3.1-1.6-5.5-4.7-7.1-2-.9-4.3-1.5-7.1-1.7-.3 0-.4-.2-.5-.4l-2.6-7.6c-.3-.9-.6-2-.6-2.5 0-1.5.8-2.3 1.9-2.9l3.4-1.8c1-.5 1.4-1.8.9-2.8s-1.8-1.4-2.8-.9l-4 2.1c-1.2.6-2.1 1.5-2.7 2.5-.3.5-.5 1.1-.7 1.7-.4 1.1-.6 2.4-.6 3.7 0 .9.2 2.2.6 3.6l1.8 5.2c.1.2 0 .4-.2.5-.5.2-1.1.4-1.7.6-2.7.8-5.4 1.5-7.1 1.5s-4.4-.7-7.1-1.5c-.6-.2-1.2-.4-1.7-.6-.2-.1-.3-.3-.2-.5l1.8-5.2c.4-1.4.6-2.7.6-3.6 0-1.3-.2-2.6-.6-3.7-.2-.6-.4-1.2-.7-1.7-.6-1-1.5-1.9-2.7-2.5l-4-2.1c-1-.5-2.3-.1-2.8.9s-.1 2.3.9 2.8l3.4 1.8c1.1.6 1.9 1.4 1.9 2.9 0 .5-.3 1.6-.6 2.5l-2.6 7.6c-.1.2-.2.4-.5.4-2.8.2-5.1.8-7.1 1.7-3.1 1.6-4.7 4-4.7 7.1 0 1.3.3 2.6.8 3.8 1.5 3.6 5.7 6.2 10.7 7.8.3.1.5.3.5.6.3 2.9 1.2 5.4 2.5 7.4 2 3 4.9 4.6 8 4.6s6-1.6 8-4.6c1.3-2 2.2-4.5 2.5-7.4 0-.3.2-.5.5-.6 5-1.6 9.2-4.2 10.7-7.8.5-1.2.8-2.5.8-3.8z" fill="white"/>
    </svg>`,
    color: 'text-[#D97757]',
  },
  {
    name: 'Cursor',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <rect width="24" height="24" rx="5" fill="currentColor"/>
        <path d="M7 5l10 7-10 7V5z" fill="#0a0a0a"/>
      </svg>
    ),
    color: 'text-white',
  },
  {
    name: 'Windsurf',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" fill="#00D9FF" fillOpacity="0.2"/>
        <path d="M6 12c3-4 6-6 12-6-4 2-6 4-8 6-2 2-4 6-4 6l-2-2c0-2 1-3 2-4z" fill="#00D9FF"/>
      </svg>
    ),
    color: 'text-[#00D9FF]',
  },
  {
    name: 'opencode',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2"/>
      </svg>
    ),
    color: 'text-emerald-400',
  },
  {
    name: 'OpenClaw',
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill="#8B5CF6"/>
      </svg>
    ),
    color: 'text-purple-400',
  },
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

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {mcpClients.map((client) => (
          <div
            key={client.name}
            className="flex flex-col items-center gap-3 group"
          >
            <div className={`${client.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
              {client.name === 'Claude' ? (
                <svg viewBox="0 0 120 120" fill="none" className="w-12 h-12">
                  <rect width="120" height="120" rx="24" fill="#D97757"/>
                  <path d="M86.1 56.4c0-3.1-1.6-5.5-4.7-7.1-2-.9-4.3-1.5-7.1-1.7-.3 0-.4-.2-.5-.4l-2.6-7.6c-.3-.9-.6-2-.6-2.5 0-1.5.8-2.3 1.9-2.9l3.4-1.8c1-.5 1.4-1.8.9-2.8s-1.8-1.4-2.8-.9l-4 2.1c-1.2.6-2.1 1.5-2.7 2.5-.3.5-.5 1.1-.7 1.7-.4 1.1-.6 2.4-.6 3.7 0 .9.2 2.2.6 3.6l1.8 5.2c.1.2 0 .4-.2.5-.5.2-1.1.4-1.7.6-2.7.8-5.4 1.5-7.1 1.5s-4.4-.7-7.1-1.5c-.6-.2-1.2-.4-1.7-.6-.2-.1-.3-.3-.2-.5l1.8-5.2c.4-1.4.6-2.7.6-3.6 0-1.3-.2-2.6-.6-3.7-.2-.6-.4-1.2-.7-1.7-.6-1-1.5-1.9-2.7-2.5l-4-2.1c-1-.5-2.3-.1-2.8.9s-.1 2.3.9 2.8l3.4 1.8c1.1.6 1.9 1.4 1.9 2.9 0 .5-.3 1.6-.6 2.5l-2.6 7.6c-.1.2-.2.4-.5.4-2.8.2-5.1.8-7.1 1.7-3.1 1.6-4.7 4-4.7 7.1 0 1.3.3 2.6.8 3.8 1.5 3.6 5.7 6.2 10.7 7.8.3.1.5.3.5.6.3 2.9 1.2 5.4 2.5 7.4 2 3 4.9 4.6 8 4.6s6-1.6 8-4.6c1.3-2 2.2-4.5 2.5-7.4 0-.3.2-.5.5-.6 5-1.6 9.2-4.2 10.7-7.8.5-1.2.8-2.5.8-3.8z" fill="white"/>
                </svg>
              ) : client.name === 'Cursor' ? (
                <svg viewBox="0 0 24 24" className="w-12 h-12">
                  <rect width="24" height="24" rx="5" fill="currentColor"/>
                  <path d="M7 5l10 7-10 7V5z" fill="#0a0a0a"/>
                </svg>
              ) : client.name === 'Windsurf' ? (
                <svg viewBox="0 0 24 24" className="w-12 h-12">
                  <circle cx="12" cy="12" r="10" fill="#00D9FF" fillOpacity="0.2"/>
                  <path d="M6 12c3-4 6-6 12-6-4 2-6 4-8 6-2 2-4 6-4 6l-2-2c0-2 1-3 2-4z" fill="#00D9FF"/>
                </svg>
              ) : client.name === 'opencode' ? (
                <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-12 h-12">
                  <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" fill="#8B5CF6"/>
                </svg>
              )}
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
