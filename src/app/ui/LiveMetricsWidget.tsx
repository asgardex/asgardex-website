'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { IconTrendingUp, IconCoins, IconServer, IconBolt } from '@tabler/icons-react'

interface NetworkData {
  totalPooledRune: string
  activeBonds: string
  bondingAPY: number
  liquidityAPY: number
  activeNodeCount: number
  nextChurnHeight: number
  totalReserve: string
  poolActivationCountdown: number
}

interface PoolSummary {
  totalLiquidity: number
  totalVolume24h: number
  averageAPY: number
  poolCount: number
  runePriceUSD: number
}

interface PoolData {
  status: string
  assetPriceUSD: string
  assetDepth: string
  runeDepth: string
  nativeDecimal?: number
  volume24h?: string
  poolAPY?: string
  asset: string
}

interface NetworkApiData {
  totalPooledRune: string
  bondMetrics: {
    totalActiveBond: string
  }
  bondingAPY: string
  liquidityAPY: string
  activeNodeCount: number
  nextChurnHeight: number
  totalReserve: string
  poolActivationCountdown: number
}

const formatCurrency = (value: string | number, decimals = 8): string => {
  const num = typeof value === 'string' ? parseInt(value) / Math.pow(10, decimals) : value
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`
  return `$${num.toFixed(0)}`
}

const formatRune = (value: string, decimals = 8): string => {
  const num = parseInt(value) / Math.pow(10, decimals)
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toFixed(0)
}

const AnimatedCounter = ({ value, formatter }: { value: number | string, formatter?: (val: number) => string }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const targetValue = typeof value === 'string' ? parseFloat(value) : value
  const animationRef = useRef<ReturnType<typeof setInterval>>()
  const currentDisplayRef = useRef(displayValue)

  useEffect(() => {
    if (isNaN(targetValue)) return

    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    const duration = 2000
    const steps = 60
    const startValue = currentDisplayRef.current
    const increment = (targetValue - startValue) / steps
    let currentStep = 0

    animationRef.current = setInterval(() => {
      currentStep++
      setDisplayValue((prev) => {
        const newValue = startValue + (increment * currentStep)
        if (currentStep >= steps) {
          if (animationRef.current) clearInterval(animationRef.current)
          currentDisplayRef.current = targetValue
          return targetValue
        }
        currentDisplayRef.current = newValue
        return newValue
      })
    }, duration / steps)

    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [targetValue])

  return (
    <span className="font-bold">
      {formatter != null ? formatter(displayValue) : displayValue.toFixed(2)}
    </span>
  )
}

export default function LiveMetricsWidget() {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null)
  const [poolSummary, setPoolSummary] = useState<PoolSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)

  // Rate limiting and abort control
  const isRefreshing = useRef(false)
  const lastFetchTime = useRef<number>(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchNetworkData = useCallback(async (signal: AbortSignal): Promise<void> => {
    try {
      const response = await fetch('https://midgard.ninerealms.com/v2/network', { signal })
      if (!response.ok) throw new Error(`Network API error: ${response.status}`)

      const data = await response.json() as NetworkApiData

      setNetworkData({
        totalPooledRune: data.totalPooledRune,
        activeBonds: data.bondMetrics.totalActiveBond,
        bondingAPY: parseFloat(data.bondingAPY) * 100,
        liquidityAPY: parseFloat(data.liquidityAPY) * 100,
        activeNodeCount: data.activeNodeCount,
        nextChurnHeight: data.nextChurnHeight,
        totalReserve: data.totalReserve,
        poolActivationCountdown: data.poolActivationCountdown
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Network data fetch aborted')
        return
      }
      console.error('Failed to fetch network data:', error)
      setError('Failed to fetch network data')
    }
  }, [])

  const fetchPoolData = useCallback(async (signal: AbortSignal): Promise<void> => {
    try {
      // Use both endpoints for comprehensive data
      const [poolsResponse, statsResponse] = await Promise.all([
        fetch('https://midgard.ninerealms.com/v2/pools', { signal }),
        fetch('https://midgard.ninerealms.com/v2/stats', { signal })
      ])

      if (!poolsResponse.ok) throw new Error(`Pools API error: ${poolsResponse.status}`)
      if (!statsResponse.ok) throw new Error(`Stats API error: ${statsResponse.status}`)

      const pools = await poolsResponse.json() as PoolData[]
      const stats = await statsResponse.json() as {
        swapVolume: string
        runePriceUSD: string
        runeDepth: string
        swapCount24h: string
        swapCount30d: string
      }

      let totalLiquidityUSD = 0
      let totalAPY = 0
      let validPools = 0

      // Calculate total liquidity from pools
      pools.forEach((pool) => {
        if (pool.status === 'available') {
          try {
            // More accurate liquidity calculation
            const assetPriceUSD = parseFloat(pool.assetPriceUSD)
            const nativeDecimal = pool.nativeDecimal ?? 8

            // Convert from base units to actual token amounts
            const assetDepth = parseInt(pool.assetDepth) / Math.pow(10, nativeDecimal)
            const runeDepth = parseInt(pool.runeDepth) / Math.pow(10, 8) // RUNE is always 8 decimals
            const runePriceUSD = parseFloat(stats.runePriceUSD)

            // Calculate USD value of both sides of the pool
            const assetValueUSD = assetDepth * assetPriceUSD
            const runeValueUSD = runeDepth * runePriceUSD

            // Debug logging for first few pools
            if (totalLiquidityUSD < 1000000) { // Only log first few calculations
              console.log(`Pool ${pool.asset}:`, {
                assetDepth: assetDepth.toFixed(2),
                assetPrice: assetPriceUSD,
                assetValueUSD: assetValueUSD.toFixed(2),
                runeDepth: runeDepth.toFixed(2),
                runePrice: runePriceUSD,
                runeValueUSD: runeValueUSD.toFixed(2),
                totalPoolValue: (assetValueUSD + runeValueUSD).toFixed(2)
              })
            }

            // Sanity check: individual pool shouldn't exceed $100M
            const poolTotalValue = assetValueUSD + runeValueUSD
            if (poolTotalValue > 0 && poolTotalValue < 100000000) {
              totalLiquidityUSD += poolTotalValue
            } else if (poolTotalValue >= 100000000) {
              console.warn(`Suspiciously high pool value for ${pool.asset}: $${poolTotalValue.toFixed(2)}`)
            }

            if (pool.poolAPY != null && parseFloat(pool.poolAPY) > 0) {
              totalAPY += parseFloat(pool.poolAPY) * 100
              validPools++
            }
          } catch (error) {
            console.warn(`Error calculating liquidity for pool ${pool.asset}:`, error)
          }
        }
      })

      // Calculate 24h volume from individual pool volumes
      let totalVolume24hUSD = 0
      pools.forEach((pool) => {
        if (pool.status === 'available' && pool.volume24h) {
          try {
            // Volume24h appears to be in RUNE units, convert to USD
            const volume24hRune = parseInt(pool.volume24h) / Math.pow(10, 8)
            const runePriceUSD = parseFloat(stats.runePriceUSD)
            const poolVolume = volume24hRune * runePriceUSD

            // Sanity check for volume (individual pool shouldn't exceed $50M daily volume)
            if (poolVolume > 0 && poolVolume < 50000000) {
              totalVolume24hUSD += poolVolume
            }
          } catch (error) {
            console.warn(`Error calculating volume for pool ${pool.asset}:`, error)
          }
        }
      })

      // Final sanity checks
      const isValidLiquidity = totalLiquidityUSD > 0 && totalLiquidityUSD < 10000000000 // Less than $10B
      const isValidVolume = totalVolume24hUSD > 0 && totalVolume24hUSD < 1000000000 // Less than $1B daily

      console.log(`Total Liquidity: $${totalLiquidityUSD.toFixed(2)}, Valid: ${isValidLiquidity}`)
      console.log(`Total Volume 24h: $${totalVolume24hUSD.toFixed(2)}, Valid: ${isValidVolume}`)

      setPoolSummary({
        totalLiquidity: isValidLiquidity ? totalLiquidityUSD : 0,
        totalVolume24h: isValidVolume ? totalVolume24hUSD : 0,
        averageAPY: validPools > 0 ? totalAPY / validPools : 0,
        poolCount: pools.filter((p) => p.status === 'available').length,
        runePriceUSD: parseFloat(stats.runePriceUSD)
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Pool data fetch aborted')
        return
      }
      console.error('Failed to fetch pool data:', error)
      setError('Failed to fetch pool data')
    }
  }, [])

  const fetchData = useCallback(async (): Promise<void> => {
    // Rate limiting: prevent overlapping requests
    const now = Date.now()
    if (isRefreshing.current || (now - lastFetchTime.current) < 5000) {
      return
    }

    // Abort any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Create new abort controller for this request
    const controller = new AbortController()
    abortControllerRef.current = controller

    // Set timeout to abort request after 8 seconds
    timeoutRef.current = setTimeout(() => {
      controller.abort()
    }, 8000)

    isRefreshing.current = true
    lastFetchTime.current = now
    setLoading(true)
    setError(null)

    try {
      await Promise.all([fetchNetworkData(controller.signal), fetchPoolData(controller.signal)])
      setLastUpdate(new Date())

      // Clear timeout on success
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Data fetch aborted due to timeout or cancellation')
        setError('Request timed out - will retry automatically')
      } else {
        console.error('Failed to fetch data:', error)
        setError('Failed to fetch data')
      }
    } finally {
      setLoading(false)
      isRefreshing.current = false

      // Clean up timeout if still active
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [fetchNetworkData, fetchPoolData])

  useEffect(() => {
    // Initial fetch
    void fetchData()

    // Set up interval for regular updates (every 30 seconds)
    const interval = setInterval(() => {
      void fetchData()
    }, 30000)

    return () => {
      clearInterval(interval)
      // Abort any pending requests and clean up timeouts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [fetchData])

  if (loading && !networkData && !poolSummary) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-foreground/60">Loading live protocol metrics...</p>
        </CardBody>
      </Card>
    )
  }

  if (error && !networkData && !poolSummary) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <p className="text-danger">{error}</p>
          <button
            onClick={() => { void fetchData() }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
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
          Live THORChain{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Metrics
          </span>
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'} ${loading ? 'animate-pulse' : ''}`}></div>
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          {error && <span className="text-danger text-xs ml-2">({error})</span>}
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Liquidity */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 hover:shadow-glow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconCoins size={24} className="text-primary" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Total Liquidity</p>
            <p className="text-lg sm:text-xl text-foreground">
              {poolSummary != null
                ? (
                <AnimatedCounter
                  value={poolSummary.totalLiquidity}
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
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30 hover:shadow-glow-blue transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconTrendingUp size={24} className="text-secondary" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">24h Volume</p>
            <p className="text-lg sm:text-xl text-foreground">
              {poolSummary != null
                ? (
                <AnimatedCounter
                  value={poolSummary.totalVolume24h}
                  formatter={(val) => formatCurrency(val, 0)}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>

        {/* Active Nodes */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 hover:shadow-glow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconServer size={24} className="text-primary" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Active Nodes</p>
            <p className="text-lg sm:text-xl text-foreground">
              {networkData != null
                ? (
                <AnimatedCounter
                  value={networkData.activeNodeCount}
                  formatter={(val) => Math.round(val).toString()}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>

        {/* Average APY */}
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30 hover:shadow-glow-blue transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconBolt size={24} className="text-secondary" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Avg Pool APY</p>
            <p className="text-lg sm:text-xl text-foreground">
              {poolSummary != null
                ? (
                <AnimatedCounter
                  value={poolSummary.averageAPY}
                  formatter={(val) => `${val.toFixed(1)}%`}
                />
                  )
                : (
                    '...'
                  )}
            </p>
          </CardBody>
        </Card>

        {/* RUNE Price */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 hover:shadow-glow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconCoins size={24} className="text-primary" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">RUNE Price</p>
            <p className="text-lg sm:text-xl text-foreground">
              {poolSummary != null
                ? (
                <AnimatedCounter
                  value={poolSummary.runePriceUSD}
                  formatter={(val) => `$${val.toFixed(3)}`}
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
        {/* Network Health */}
        <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
          <CardBody className="p-4">
            <h4 className="text-md font-bold text-foreground mb-3 flex items-center gap-2">
              <IconServer size={20} className="text-primary" />
              Network Health
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Total Pooled RUNE</span>
                <span className="text-sm font-semibold text-foreground">
                  {networkData != null ? `${formatRune(networkData.totalPooledRune)} RUNE` : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Active Bonds</span>
                <span className="text-sm font-semibold text-foreground">
                  {networkData != null ? `${formatRune(networkData.activeBonds)} RUNE` : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Bonding APY</span>
                <span className="text-sm font-semibold text-primary">
                  {networkData != null ? `${networkData.bondingAPY.toFixed(2)}%` : '...'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pool Statistics */}
        <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20">
          <CardBody className="p-4">
            <h4 className="text-md font-bold text-foreground mb-3 flex items-center gap-2">
              <IconCoins size={20} className="text-secondary" />
              Pool Statistics
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Active Pools</span>
                <span className="text-sm font-semibold text-foreground">
                  {poolSummary?.poolCount ?? '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Liquidity APY</span>
                <span className="text-sm font-semibold text-secondary">
                  {networkData != null ? `${networkData.liquidityAPY.toFixed(3)}%` : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Next Churn</span>
                <span className="text-sm font-semibold text-foreground">
                  {networkData != null ? networkData.nextChurnHeight.toLocaleString() : '...'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
