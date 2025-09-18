'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { IconTrendingUp, IconCoins, IconArrowsLeftRight, IconBolt } from '@tabler/icons-react'

interface ChainflipData {
  totalLiquidity: number
  totalVolume24h: number
  swapCount24h: number
  boostLiquidity: number
  stablecoinLiquidity: number
}

interface LiquidityNode {
  totalLiquidityValueUsd: string
  totalBoostLiquidityValueUsd: string
  totalStablecoinLiquidityValueUsd: string
  timestamp: string
}

interface VolumeAggregates {
  sum: {
    ingressValueUsd: string
  }
  distinctCount: {
    id: string
  }
}

const formatCurrency = (value: string | number, decimals = 0): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`
  return `$${num.toFixed(decimals)}`
}

const AnimatedCounter = ({ value, formatter }: { value: number | string, formatter?: (val: number) => string }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const targetValue = typeof value === 'string' ? parseFloat(value) : value
  const animationRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isNaN(targetValue)) return

    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    const duration = 2000
    const steps = 60
    const startValue = displayValue
    const increment = (targetValue - startValue) / steps
    let currentStep = 0

    animationRef.current = setInterval(() => {
      currentStep++
      setDisplayValue((prev) => {
        const newValue = startValue + (increment * currentStep)
        if (currentStep >= steps) {
          if (animationRef.current) clearInterval(animationRef.current)
          return targetValue
        }
        return newValue
      })
    }, duration / steps)

    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [targetValue, displayValue])

  return (
    <span className="font-bold">
      {formatter != null ? formatter(displayValue) : displayValue.toFixed(2)}
    </span>
  )
}

export default function LiveChainflipMetricsWidget() {
  const [chainflipData, setChainflipData] = useState<ChainflipData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)

  // Rate limiting: prevent multiple simultaneous requests
  const isRefreshing = useRef(false)
  const lastFetchTime = useRef<number>(0)

  const fetchChainflipData = useCallback(async (): Promise<void> => {
    // Rate limiting: prevent overlapping requests
    const now = Date.now()
    if (isRefreshing.current || (now - lastFetchTime.current) < 5000) {
      return
    }

    isRefreshing.current = true
    lastFetchTime.current = now
    setLoading(true)
    setError(null)

    try {
      // Get 24 hours ago timestamp
      const yesterday = new Date()
      yesterday.setHours(yesterday.getHours() - 24)
      const yesterdayISO = yesterday.toISOString()

      // Fetch liquidity data
      const liquidityQuery = {
        query: `query { 
          allLiquidityInfos(first: 1, orderBy: TIMESTAMP_DESC) { 
            nodes { 
              totalLiquidityValueUsd 
              totalBoostLiquidityValueUsd 
              totalStablecoinLiquidityValueUsd 
              timestamp 
            } 
          } 
        }`
      }

      // Fetch 24h volume and swap count
      const volumeQuery = {
        query: `query { 
          allSwapRequests(
            condition: {isInProgress: false}, 
            filter: {completedBlockTimestamp: {greaterThan: "${yesterdayISO}"}}
          ) { 
            aggregates { 
              sum { ingressValueUsd } 
              distinctCount { id } 
            } 
          } 
        }`
      }

      const [liquidityResponse, volumeResponse] = await Promise.all([
        fetch('https://reporting-service.chainflip.io/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(liquidityQuery)
        }),
        fetch('https://reporting-service.chainflip.io/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(volumeQuery)
        })
      ])

      if (!liquidityResponse.ok) throw new Error(`Chainflip Liquidity API error: ${liquidityResponse.status}`)
      if (!volumeResponse.ok) throw new Error(`Chainflip Volume API error: ${volumeResponse.status}`)

      const liquidityData = await liquidityResponse.json()
      const volumeData = await volumeResponse.json()

      // Check for GraphQL errors
      if (liquidityData.errors) {
        throw new Error(`Chainflip Liquidity GraphQL error: ${liquidityData.errors[0].message}`)
      }
      if (volumeData.errors) {
        throw new Error(`Chainflip Volume GraphQL error: ${volumeData.errors[0].message}`)
      }

      const liquidity = liquidityData.data.allLiquidityInfos.nodes[0] as LiquidityNode
      const volume = volumeData.data.allSwapRequests.aggregates as VolumeAggregates

      console.log('Chainflip Liquidity Data:', liquidity)
      console.log('Chainflip Volume Data:', volume)

      setChainflipData({
        totalLiquidity: parseFloat(liquidity.totalLiquidityValueUsd || '0'),
        totalVolume24h: parseFloat(volume.sum.ingressValueUsd || '0'),
        swapCount24h: parseInt(volume.distinctCount.id || '0', 10),
        boostLiquidity: parseFloat(liquidity.totalBoostLiquidityValueUsd || '0'),
        stablecoinLiquidity: parseFloat(liquidity.totalStablecoinLiquidityValueUsd || '0')
      })

      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch Chainflip data:', error)
      setError('Failed to fetch Chainflip data')
    } finally {
      setLoading(false)
      isRefreshing.current = false
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    void fetchChainflipData()

    // Set up interval for regular updates (every 30 seconds)
    const interval = setInterval(() => {
      void fetchChainflipData()
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [fetchChainflipData])

  if (loading && !chainflipData) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <Spinner size="lg" color="warning" />
          <p className="mt-4 text-foreground/60">Loading live Chainflip metrics...</p>
        </CardBody>
      </Card>
    )
  }

  if (error && !chainflipData) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <p className="text-danger">{error}</p>
          <button
            onClick={() => { void fetchChainflipData() }}
            className="mt-4 px-4 py-2 bg-warning text-white rounded"
          >
            Retry
          </button>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Live Chainflip{' '}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Metrics
          </span>
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-orange-500'} ${loading ? 'animate-pulse' : ''}`}></div>
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          {error && <span className="text-danger text-xs ml-2">({error})</span>}
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Liquidity */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 border-orange-500/30 hover:shadow-glow-orange transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconCoins size={24} className="text-orange-500" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Total Liquidity</p>
            <p className="text-lg sm:text-xl text-foreground">
              {chainflipData != null
                ? (
                <AnimatedCounter
                  value={chainflipData.totalLiquidity}
                  formatter={(val) => formatCurrency(val, 0)}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>

        {/* 24h Volume */}
        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 hover:shadow-glow-yellow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconTrendingUp size={24} className="text-yellow-500" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">24h Volume</p>
            <p className="text-lg sm:text-xl text-foreground">
              {chainflipData != null
                ? (
                <AnimatedCounter
                  value={chainflipData.totalVolume24h}
                  formatter={(val) => formatCurrency(val, 0)}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>

        {/* 24h Swaps */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 border-orange-500/30 hover:shadow-glow-orange transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconArrowsLeftRight size={24} className="text-orange-500" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">24h Swaps</p>
            <p className="text-lg sm:text-xl text-foreground">
              {chainflipData != null
                ? (
                <AnimatedCounter
                  value={chainflipData.swapCount24h}
                  formatter={(val) => Math.round(val).toLocaleString()}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>

        {/* Boost Liquidity */}
        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 hover:shadow-glow-yellow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconBolt size={24} className="text-yellow-500" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Boost Liquidity</p>
            <p className="text-lg sm:text-xl text-foreground">
              {chainflipData != null
                ? (
                <AnimatedCounter
                  value={chainflipData.boostLiquidity}
                  formatter={(val) => formatCurrency(val, 0)}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liquidity Breakdown */}
        <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
          <CardBody className="p-4">
            <h4 className="text-md font-bold text-foreground mb-3 flex items-center gap-2">
              <IconCoins size={20} className="text-orange-500" />
              Liquidity Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Total Liquidity</span>
                <span className="text-sm font-semibold text-foreground">
                  {chainflipData != null ? formatCurrency(chainflipData.totalLiquidity) : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Boost Liquidity</span>
                <span className="text-sm font-semibold text-foreground">
                  {chainflipData != null ? formatCurrency(chainflipData.boostLiquidity) : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Stablecoin Liquidity</span>
                <span className="text-sm font-semibold text-orange-500">
                  {chainflipData != null ? formatCurrency(chainflipData.stablecoinLiquidity) : '...'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Swap Statistics */}
        <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
          <CardBody className="p-4">
            <h4 className="text-md font-bold text-foreground mb-3 flex items-center gap-2">
              <IconTrendingUp size={20} className="text-yellow-500" />
              Swap Statistics
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">24h Volume</span>
                <span className="text-sm font-semibold text-foreground">
                  {chainflipData != null ? formatCurrency(chainflipData.totalVolume24h) : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">24h Swap Count</span>
                <span className="text-sm font-semibold text-foreground">
                  {chainflipData?.swapCount24h?.toLocaleString() ?? '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Avg Swap Size</span>
                <span className="text-sm font-semibold text-yellow-500">
                  {chainflipData != null && chainflipData.swapCount24h > 0
                    ? formatCurrency(chainflipData.totalVolume24h / chainflipData.swapCount24h)
                    : '...'
                  }
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

