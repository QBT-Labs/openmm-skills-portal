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

      <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
        {/* Claude - Anthropic brand icon */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 rounded-2xl overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity bg-[#D97757]">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <rect width="120" height="120" fill="#D97757"/>
              <path d="M60 28c-4.4 0-8.5 1.4-11.8 3.8-1.2-0.5-2.6-0.8-4-0.8-5.5 0-10 4.5-10 10 0 1.4 0.3 2.7 0.8 3.9C32.4 48.2 31 52.3 31 56.7c0 4.4 1.4 8.5 3.8 11.8-0.5 1.2-0.8 2.5-0.8 3.9 0 5.5 4.5 10 10 10 1.4 0 2.8-0.3 4-0.8 3.3 2.4 7.4 3.8 11.8 3.8s8.5-1.4 11.8-3.8c1.2 0.5 2.6 0.8 4 0.8 5.5 0 10-4.5 10-10 0-1.4-0.3-2.8-0.8-4 2.4-3.3 3.8-7.4 3.8-11.8 0-4.4-1.4-8.5-3.8-11.8 0.5-1.2 0.8-2.5 0.8-3.9 0-5.5-4.5-10-10-10-1.4 0-2.7 0.3-3.9 0.8C68.5 29.4 64.4 28 60 28z" fill="white"/>
              <circle cx="50" cy="52" r="4" fill="#D97757"/>
              <circle cx="70" cy="52" r="4" fill="#D97757"/>
              <path d="M50 66c0 0 4 6 10 6s10-6 10-6" stroke="#D97757" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Claude</span>
        </div>

        {/* Cursor - Play button style */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 rounded-2xl overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity bg-[#E8E8E8]">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <rect width="120" height="120" fill="#E8E8E8"/>
              <path d="M45 35L85 60L45 85V35Z" fill="#1A1A1A"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Cursor</span>
        </div>

        {/* Windsurf - Teal circle with wave */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 rounded-full overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity bg-[#1E3A4C]">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <circle cx="60" cy="60" r="60" fill="#1E3A4C"/>
              <path d="M30 70C50 45 60 38 95 30C70 45 58 55 48 72C38 89 32 95 28 100L22 88C22 78 26 72 30 70Z" fill="#00E5E5"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Windsurf</span>
        </div>

        {/* opencode - Green angle brackets */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <path d="M48 30L18 60L48 90" stroke="#10B981" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M72 30L102 60L72 90" stroke="#10B981" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">opencode</span>
        </div>

        {/* OpenClaw - Purple hexagon */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="w-16 h-16 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <path d="M60 8L108 34V86L60 112L12 86V34L60 8Z" stroke="#8B5CF6" strokeWidth="5" fill="#8B5CF6" fillOpacity="0.15"/>
              <circle cx="60" cy="60" r="14" fill="#8B5CF6"/>
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
