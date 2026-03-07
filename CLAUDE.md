# CLAUDE.md — OpenMM Skills Portal

## Project Overview

OpenMM Skills Portal is a public-facing documentation and skills directory site for OpenMM — the AI-native trading infrastructure by QBT Labs.

**URL Target:** skills.openmm.io or agents.qbtlabs.io

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 4.x + shadcn/ui components
- **Language:** TypeScript
- **Deployment:** Vercel
- **Package Manager:** pnpm

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── docs/               # Documentation section
│   └── skills/             # Skills directory
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── landing/            # Landing page sections
│   ├── skills/             # Skills cards & directory
│   └── docs/               # Documentation components
├── lib/                    # Utilities
│   └── utils.ts            # cn() and helpers
└── styles/                 # Global styles
    └── globals.css         # Tailwind imports
```

## Design Reference

Follow the clean, dark, developer-friendly aesthetic of:
- agents.nansen.ai
- skills.bankr.bot
- web3.okx.com/onchainos

## Key Sections

1. **Hero** — Tagline + npm install command + stats bar
2. **Access Methods** — Skills / MCP / CLI / API cards
3. **Skills Directory** — Browsable skill cards with install commands
4. **x402 Pricing** — Tiered pricing table with use case costs
5. **Documentation** — Quick start, MCP setup guides, API reference
6. **Exchanges** — Supported exchange logos
7. **Use Cases** — What agents build with OpenMM

## Linear Issues

- QBT-296: [EPIC] OpenMM Skills & Docs Portal
- QBT-297: Landing Page: Hero + Stats + Install Command
- QBT-298: Access Methods: Skills / MCP / CLI / API cards
- QBT-299: Skills Directory: Browsable skill cards
- QBT-300: x402 Pricing: Tiered pricing table + use cases
- QBT-301: Documentation: Quick Start + API Reference
- QBT-302: MCP Setup Guides: Claude, Cursor, OpenClaw, Windsurf
- QBT-303: Supported Exchanges: Visual grid with logos
- QBT-304: Use Cases: What agents build with OpenMM
- QBT-305: Tech Setup: Next.js + Tailwind + Vercel
- QBT-306: Design: Clean dark theme like Nansen/OKX

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm lint     # Run ESLint
```

## Content Data

### Skills
- openmm-market-data: Get prices, orderbooks, trades
- openmm-trading: Place orders, manage grids, check balances
- openmm-cardano: Cardano DEX pools, CNT prices

### Exchanges
- MEXC (live)
- Gate.io (live)
- Bitget (live)
- Kraken (live)
- Hyperliquid (coming soon)

### x402 Pricing
| Tier | Price | Endpoints |
|------|-------|-----------|
| Basic | $0.01 | ticker, orderbook, trades, balances |
| Trading | $0.05 | place_order, cancel_order, grid_setup |
| Premium | $0.10-0.25 | AI analysis, strategy generation |

## Agent Workflow

This project uses multi-agent development:
- **Agent 1:** Landing page sections (Hero, Stats, Access Methods)
- **Agent 2:** Skills directory and cards
- **Agent 3:** Documentation structure
- **Agent 4:** Design system and components

Each agent works on a feature branch and creates PRs.
