export interface Tool {
  name: string
  description: string
  parameters: { name: string; type: string; required: boolean; description: string }[]
  example: {
    request: string
    response: string
  }
}

export interface Skill {
  slug: string
  name: string
  description: string
  longDescription: string
  category: 'market-data' | 'trading' | 'cardano'
  tools: Tool[]
  installCommands: {
    client: string
    command: string
  }[]
  useCases: string[]
  relatedSkills: string[]
  pricing: string
}

export const skills: Skill[] = [
  {
    slug: 'openmm-market-data',
    name: 'openmm-market-data',
    description: 'Get prices, orderbooks, and trades across exchanges',
    longDescription: 'Access real-time market data from 4+ centralized exchanges plus Cardano DEX aggregation. Get ticker prices, full orderbook depth, recent trades with buy/sell breakdown, and Cardano native token prices via DEX pools.',
    category: 'market-data',
    tools: [
      {
        name: 'openmm_ticker',
        description: 'Get the current price, bid/ask, spread, and 24h volume for a trading pair.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id: mexc, gateio, kraken, bitget' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair in BASE/QUOTE format, e.g. BTC/USDT' },
        ],
        example: {
          request: 'openmm_ticker exchange="mexc" symbol="BTC/USDT"',
          response: `{
  "symbol": "BTC/USDT",
  "last": 67234.50,
  "bid": 67232.10,
  "ask": 67236.90,
  "spread": "0.007%",
  "volume24h": 12453.82,
  "change24h": "+2.34%"
}`,
        },
      },
      {
        name: 'openmm_orderbook',
        description: 'Get the order book (bids and asks) for a trading pair.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair, e.g. ADA/EUR' },
          { name: 'limit', type: 'number', required: false, description: 'Number of levels to return (default 10)' },
        ],
        example: {
          request: 'openmm_orderbook exchange="kraken" symbol="ETH/USD" limit=5',
          response: `{
  "symbol": "ETH/USD",
  "bids": [
    [3456.20, 12.5],
    [3456.00, 8.3],
    [3455.80, 25.1]
  ],
  "asks": [
    [3456.50, 10.2],
    [3456.70, 15.8],
    [3457.00, 22.4]
  ],
  "timestamp": "2026-03-08T00:45:00Z"
}`,
        },
      },
      {
        name: 'openmm_trades',
        description: 'Get recent trades for a trading pair with buy/sell breakdown.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
          { name: 'limit', type: 'number', required: false, description: 'Number of trades to return (default 50)' },
        ],
        example: {
          request: 'openmm_trades exchange="gateio" symbol="SOL/USDT" limit=3',
          response: `{
  "symbol": "SOL/USDT",
  "trades": [
    { "price": 142.35, "amount": 25.0, "side": "buy", "time": "00:44:58" },
    { "price": 142.30, "amount": 10.5, "side": "sell", "time": "00:44:55" },
    { "price": 142.32, "amount": 50.0, "side": "buy", "time": "00:44:52" }
  ],
  "buyVolume": 75.0,
  "sellVolume": 10.5
}`,
        },
      },
      {
        name: 'openmm_cardano_price',
        description: 'Get the aggregated Cardano token price from DEX pools. Calculates TOKEN/USDT via TOKEN/ADA × ADA/USDT.',
        parameters: [
          { name: 'symbol', type: 'string', required: true, description: 'Cardano token symbol, e.g. SNEK, INDY, NIGHT' },
        ],
        example: {
          request: 'openmm_cardano_price symbol="SNEK"',
          response: `{
  "symbol": "SNEK",
  "priceAda": 0.00045,
  "priceUsdt": 0.00032,
  "adaPrice": 0.71,
  "source": "minswap,sundaeswap,wingriders",
  "liquidity": "2.4M ADA"
}`,
        },
      },
      {
        name: 'openmm_discover_pools',
        description: 'Discover Cardano DEX liquidity pools for a token via Iris Protocol.',
        parameters: [
          { name: 'symbol', type: 'string', required: true, description: 'Cardano token symbol' },
          { name: 'minLiquidity', type: 'number', required: false, description: 'Minimum TVL in ADA to filter pools' },
        ],
        example: {
          request: 'openmm_discover_pools symbol="INDY" minLiquidity=100000',
          response: `{
  "symbol": "INDY",
  "pools": [
    { "dex": "Minswap", "pair": "INDY/ADA", "tvl": "1.2M ADA", "volume24h": "45K ADA" },
    { "dex": "SundaeSwap", "pair": "INDY/ADA", "tvl": "450K ADA", "volume24h": "12K ADA" }
  ],
  "totalLiquidity": "1.65M ADA"
}`,
        },
      },
    ],
    installCommands: [
      { client: 'Claude Code', command: 'npx skills add qbt-labs/openmm-market-data' },
      { client: 'Cursor', command: 'npx skills add qbt-labs/openmm-market-data' },
      { client: 'OpenClaw', command: 'openclaw skills add qbt-labs/openmm-market-data' },
      { client: 'MCP Config', command: `{
  "mcpServers": {
    "openmm-market-data": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-market-data"]
    }
  }
}` },
    ],
    useCases: [
      'Monitor real-time prices across multiple exchanges',
      'Build arbitrage detection systems',
      'Track Cardano native token prices',
      'Analyze orderbook depth before large trades',
      'Stream trade data for market analysis',
    ],
    relatedSkills: ['openmm-trading', 'openmm-cardano'],
    pricing: '$0.01 per call',
  },
  {
    slug: 'openmm-trading',
    name: 'openmm-trading',
    description: 'Place orders, manage grids, check balances',
    longDescription: 'Execute trades and manage positions across supported exchanges. Check account balances, list open orders, monitor grid trading strategies, and get real-time status of your trading operations.',
    category: 'trading',
    tools: [
      {
        name: 'openmm_balance',
        description: 'Get account balances for a supported exchange. Returns all assets or a specific one.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id: mexc, gateio, kraken, bitget' },
          { name: 'asset', type: 'string', required: false, description: 'Filter by asset symbol, e.g. BTC, USDT' },
        ],
        example: {
          request: 'openmm_balance exchange="mexc"',
          response: `{
  "exchange": "mexc",
  "balances": [
    { "asset": "USDT", "free": 5420.50, "locked": 1200.00 },
    { "asset": "BTC", "free": 0.125, "locked": 0.0 },
    { "asset": "ETH", "free": 2.5, "locked": 0.5 }
  ],
  "totalUsdValue": 15234.80
}`,
        },
      },
      {
        name: 'openmm_list_orders',
        description: 'List open orders on an exchange, optionally filtered by trading pair.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: false, description: 'Filter by trading pair' },
          { name: 'limit', type: 'number', required: false, description: 'Max orders to return' },
        ],
        example: {
          request: 'openmm_list_orders exchange="gateio" symbol="ETH/USDT"',
          response: `{
  "exchange": "gateio",
  "symbol": "ETH/USDT",
  "orders": [
    { "id": "12345", "side": "buy", "price": 3400.00, "amount": 1.0, "filled": 0.0, "status": "open" },
    { "id": "12346", "side": "sell", "price": 3600.00, "amount": 0.5, "filled": 0.0, "status": "open" }
  ],
  "count": 2
}`,
        },
      },
      {
        name: 'openmm_grid_status',
        description: 'Get the current status of a grid strategy by listing open orders and the current price for the pair.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
        ],
        example: {
          request: 'openmm_grid_status exchange="bitget" symbol="BTC/USDT"',
          response: `{
  "exchange": "bitget",
  "symbol": "BTC/USDT",
  "currentPrice": 67250.00,
  "gridOrders": {
    "buyOrders": 5,
    "sellOrders": 5,
    "lowestBuy": 65000.00,
    "highestSell": 70000.00
  },
  "profit": {
    "realized": 234.50,
    "unrealized": 45.20
  },
  "status": "active"
}`,
        },
      },
    ],
    installCommands: [
      { client: 'Claude Code', command: 'npx skills add qbt-labs/openmm-trading' },
      { client: 'Cursor', command: 'npx skills add qbt-labs/openmm-trading' },
      { client: 'OpenClaw', command: 'openclaw skills add qbt-labs/openmm-trading' },
      { client: 'MCP Config', command: `{
  "mcpServers": {
    "openmm-trading": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-trading"],
      "env": {
        "OPENMM_API_KEY": "your-api-key"
      }
    }
  }
}` },
    ],
    useCases: [
      'Monitor portfolio balances across exchanges',
      'Track open orders and their fill status',
      'Run and monitor grid trading strategies',
      'Build automated rebalancing systems',
      'Create trading dashboards for AI agents',
    ],
    relatedSkills: ['openmm-market-data'],
    pricing: '$0.01-0.05 per call',
  },
]

  {
    slug: 'openmm-cardano',
    name: 'openmm-cardano',
    description: 'Cardano DEX integration via Iris Protocol',
    longDescription: 'Access Cardano DeFi through pool discovery, price aggregation, and DEX analytics. Find optimal liquidity pools for native tokens, compare prices across DEXes, and get real-time market data from Minswap, SundaeSwap, WingRiders, and more.',
    category: 'cardano',
    tools: [
      {
        name: 'openmm_cardano_price',
        description: 'Get aggregated Cardano token price from DEX pools via TOKEN/ADA × ADA/USDT.',
        parameters: [
          { name: 'symbol', type: 'string', required: true, description: 'Cardano token symbol: SNEK, INDY, NIGHT, etc.' },
        ],
        example: {
          request: 'openmm_cardano_price symbol="SNEK"',
          response: `{
  "symbol": "SNEK",
  "priceAda": 0.00045,
  "priceUsdt": 0.00032,
  "adaPrice": 0.71,
  "source": "minswap,sundaeswap,wingriders",
  "liquidity": "2.4M ADA"
}`,
        },
      },
      {
        name: 'openmm_discover_pools',
        description: 'Discover Cardano DEX liquidity pools for a token via Iris Protocol.',
        parameters: [
          { name: 'symbol', type: 'string', required: true, description: 'Cardano token symbol' },
          { name: 'minLiquidity', type: 'number', required: false, description: 'Minimum TVL in ADA to filter pools' },
        ],
        example: {
          request: 'openmm_discover_pools symbol="INDY" minLiquidity=100000',
          response: `{
  "symbol": "INDY",
  "pools": [
    { "dex": "Minswap", "pair": "INDY/ADA", "tvl": "1.2M ADA", "volume24h": "45K ADA" },
    { "dex": "SundaeSwap", "pair": "INDY/ADA", "tvl": "450K ADA", "volume24h": "12K ADA" }
  ],
  "totalLiquidity": "1.65M ADA"
}`,
        },
      },
      {
        name: 'openmm_price_comparison',
        description: 'Compare token prices across CEX and Cardano DEX pools.',
        parameters: [
          { name: 'symbol', type: 'string', required: true, description: 'Token symbol to compare' },
        ],
        example: {
          request: 'openmm_price_comparison symbol="SNEK"',
          response: `{
  "symbol": "SNEK",
  "prices": {
    "mexc": 0.000325,
    "gateio": 0.000322,
    "minswap": 0.000320,
    "sundaeswap": 0.000318
  },
  "spread": "2.2%",
  "arbitrageOpportunity": true
}`,
        },
      },
    ],
    installCommands: [
      { client: 'Claude Code', command: 'npx skills add qbt-labs/openmm-cardano' },
      { client: 'Cursor', command: 'npx skills add qbt-labs/openmm-cardano' },
      { client: 'OpenClaw', command: 'openclaw skills add qbt-labs/openmm-cardano' },
      { client: 'MCP Config', command: `{
  "mcpServers": {
    "openmm-cardano": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-cardano"]
    }
  }
}` },
    ],
    useCases: [
      'Find best liquidity pools for Cardano native tokens',
      'Detect CEX/DEX arbitrage opportunities',
      'Monitor Cardano DeFi token prices',
      'Analyze pool TVL and volume trends',
      'Build Cardano trading strategies',
    ],
    relatedSkills: ['openmm-market-data', 'openmm-strategy'],
    pricing: '$0.01 per call',
  },
  {
    slug: 'openmm-strategy',
    name: 'openmm-strategy',
    description: 'Grid trading and automated strategies',
    longDescription: 'Execute automated trading strategies including grid trading. Set up grid bots with configurable ranges, manage active strategies, and monitor performance across supported exchanges.',
    category: 'trading',
    tools: [
      {
        name: 'openmm_grid_status',
        description: 'Get current status of a grid trading strategy.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
        ],
        example: {
          request: 'openmm_grid_status exchange="mexc" symbol="BTC/USDT"',
          response: `{
  "exchange": "mexc",
  "symbol": "BTC/USDT",
  "currentPrice": 67250.00,
  "gridOrders": {
    "buyOrders": 5,
    "sellOrders": 5,
    "lowestBuy": 65000.00,
    "highestSell": 70000.00
  },
  "profit": {
    "realized": 234.50,
    "unrealized": 45.20
  },
  "status": "active"
}`,
        },
      },
      {
        name: 'openmm_grid_start',
        description: 'Start a new grid trading strategy.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
          { name: 'lowerPrice', type: 'number', required: true, description: 'Lower bound of grid range' },
          { name: 'upperPrice', type: 'number', required: true, description: 'Upper bound of grid range' },
          { name: 'gridCount', type: 'number', required: true, description: 'Number of grid levels' },
          { name: 'investment', type: 'number', required: true, description: 'Total investment amount' },
        ],
        example: {
          request: 'openmm_grid_start exchange="mexc" symbol="BTC/USDT" lowerPrice=60000 upperPrice=70000 gridCount=10 investment=1000',
          response: `{
  "status": "started",
  "gridId": "grid_abc123",
  "config": {
    "range": [60000, 70000],
    "levels": 10,
    "orderSize": 100.00
  },
  "orders": {
    "placed": 10,
    "buyOrders": 5,
    "sellOrders": 5
  }
}`,
        },
      },
      {
        name: 'openmm_grid_stop',
        description: 'Stop an active grid trading strategy and cancel all orders.',
        parameters: [
          { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
          { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
        ],
        example: {
          request: 'openmm_grid_stop exchange="mexc" symbol="BTC/USDT"',
          response: `{
  "status": "stopped",
  "ordersCancelled": 8,
  "finalProfit": 234.50,
  "runtime": "2d 14h 32m"
}`,
        },
      },
    ],
    installCommands: [
      { client: 'Claude Code', command: 'npx skills add qbt-labs/openmm-strategy' },
      { client: 'Cursor', command: 'npx skills add qbt-labs/openmm-strategy' },
      { client: 'OpenClaw', command: 'openclaw skills add qbt-labs/openmm-strategy' },
      { client: 'MCP Config', command: `{
  "mcpServers": {
    "openmm-strategy": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-strategy"],
      "env": {
        "OPENMM_API_KEY": "your-api-key"
      }
    }
  }
}` },
    ],
    useCases: [
      'Run automated grid trading strategies',
      'Profit from sideways market volatility',
      'Set and forget trading bots',
      'Manage multiple grids across exchanges',
      'Automated market making for tokens',
    ],
    relatedSkills: ['openmm-trading', 'openmm-cardano'],
    pricing: '$0.05 per call',
  },
]

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find(s => s.slug === slug)
}

export function getRelatedSkills(skill: Skill): Skill[] {
  return skills.filter(s => skill.relatedSkills.includes(s.slug))
}
