# OpenMM Skills Portal

> AI-Native Trading Infrastructure — Skills, MCP, and Documentation

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)](https://tailwindcss.com/)

**🤖 [agents.openmm.io](https://agents.openmm.io)** · **📚 [docs.openmm.io](https://docs.openmm.io)** · **🔌 [api.openmm.io](https://api.openmm.io)**

## Overview

OpenMM Skills Portal is the public-facing documentation and skills directory for [OpenMM](https://github.com/3rd-Eye-Labs/OpenMM) — open-source market making tools for AI agents.

**Live at:** [agents.openmm.io](https://agents.openmm.io)

## Features

- 🎯 **Skills Directory** — Browse and install OpenMM skills
- 🔌 **MCP Integration** — Connect to Claude, Cursor, OpenClaw
- 💰 **x402 Pricing** — Pay-per-call with USDC
- 📚 **Documentation** — Quick start guides and API reference
- 🏦 **Multi-Exchange** — MEXC, Gate.io, Bitget, Kraken

## Quick Start

```bash
# Clone the repo
git clone https://github.com/QBT-Labs/openmm-skills-portal.git
cd openmm-skills-portal

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── ui/                 # shadcn/ui
│   ├── landing/            # Landing sections
│   ├── skills/             # Skills directory
│   └── docs/               # Documentation
├── lib/                    # Utilities
└── styles/                 # Global styles
```

## Skills Available

| Skill | Description | Install |
|-------|-------------|---------|
| openmm-market-data | Prices, orderbooks, trades | `npx skills add qbt-labs/openmm-market-data` |
| openmm-trading | Orders, grids, balances | `npx skills add qbt-labs/openmm-trading` |
| openmm-cardano | Cardano DEX, CNT prices | `npx skills add qbt-labs/openmm-cardano` |

## x402 Pricing

| Tier | Price | Endpoints |
|------|-------|-----------|
| Basic | $0.01/call | ticker, orderbook, trades |
| Trading | $0.05/call | place_order, cancel_order |
| Premium | $0.10-0.25/call | AI analysis, strategies |

## Contributing

See [CLAUDE.md](./CLAUDE.md) for development guidelines.

## License

MIT © [QBT Labs](https://qbtlabs.io)
