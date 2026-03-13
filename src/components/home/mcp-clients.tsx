'use client'

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
        {/* Claude */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-14 h-14 rounded-xl overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <rect width="120" height="120" rx="24" fill="#D97757"/>
              <path d="M86.1 56.4c0-3.1-1.6-5.5-4.7-7.1-2-.9-4.3-1.5-7.1-1.7-.3 0-.4-.2-.5-.4l-2.6-7.6c-.3-.9-.6-2-.6-2.5 0-1.5.8-2.3 1.9-2.9l3.4-1.8c1-.5 1.4-1.8.9-2.8s-1.8-1.4-2.8-.9l-4 2.1c-1.2.6-2.1 1.5-2.7 2.5-.3.5-.5 1.1-.7 1.7-.4 1.1-.6 2.4-.6 3.7 0 .9.2 2.2.6 3.6l1.8 5.2c.1.2 0 .4-.2.5-.5.2-1.1.4-1.7.6-2.7.8-5.4 1.5-7.1 1.5s-4.4-.7-7.1-1.5c-.6-.2-1.2-.4-1.7-.6-.2-.1-.3-.3-.2-.5l1.8-5.2c.4-1.4.6-2.7.6-3.6 0-1.3-.2-2.6-.6-3.7-.2-.6-.4-1.2-.7-1.7-.6-1-1.5-1.9-2.7-2.5l-4-2.1c-1-.5-2.3-.1-2.8.9s-.1 2.3.9 2.8l3.4 1.8c1.1.6 1.9 1.4 1.9 2.9 0 .5-.3 1.6-.6 2.5l-2.6 7.6c-.1.2-.2.4-.5.4-2.8.2-5.1.8-7.1 1.7-3.1 1.6-4.7 4-4.7 7.1 0 1.3.3 2.6.8 3.8 1.5 3.6 5.7 6.2 10.7 7.8.3.1.5.3.5.6.3 2.9 1.2 5.4 2.5 7.4 2 3 4.9 4.6 8 4.6s6-1.6 8-4.6c1.3-2 2.2-4.5 2.5-7.4 0-.3.2-.5.5-.6 5-1.6 9.2-4.2 10.7-7.8.5-1.2.8-2.5.8-3.8z" fill="white"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Claude</span>
        </div>

        {/* Cursor */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-14 h-14 rounded-xl overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity bg-[#F5F5F5]">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <rect width="120" height="120" fill="#F5F5F5"/>
              <path d="M40 30L90 60L40 90V30Z" fill="#1A1A1A"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Cursor</span>
        </div>

        {/* Windsurf */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-14 h-14 rounded-full overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <circle cx="60" cy="60" r="60" fill="#1A3A4A"/>
              <path d="M30 70C45 50 55 40 90 35C70 45 60 55 50 70C40 85 35 95 30 100L25 90C25 80 28 75 30 70Z" fill="#00D4D4"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Windsurf</span>
        </div>

        {/* opencode */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-14 h-14 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <path d="M45 30L15 60L45 90" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M75 30L105 60L75 90" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">opencode</span>
        </div>

        {/* OpenClaw */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-14 h-14 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <path d="M60 10L105 35V85L60 110L15 85V35L60 10Z" stroke="#8B5CF6" strokeWidth="6" fill="#8B5CF6" fillOpacity="0.15"/>
              <circle cx="60" cy="60" r="12" fill="#8B5CF6"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">OpenClaw</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-8">
        And any other MCP-compatible client
      </p>
    </section>
  )
}
