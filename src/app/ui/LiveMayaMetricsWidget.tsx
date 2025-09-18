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
  cacaoPriceUSD: number
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

const formatCacao = (value: string, decimals = 10): string => {
  const num = parseInt(value) / Math.pow(10, decimals)
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toFixed(0)
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

export default function LiveMayaMetricsWidget() {
  const [networkData, setNetworkData] = useState<NetworkData | null>(null)
  const [poolSummary, setPoolSummary] = useState<PoolSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)

  // Rate limiting: prevent multiple simultaneous requests
  const isRefreshing = useRef(false)
  const lastFetchTime = useRef<number>(0)

  const fetchNetworkData = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch('https://midgard.mayachain.info/v2/network')
      if (!response.ok) throw new Error(`MayaChain Network API error: ${response.status}`)

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
      console.error('Failed to fetch MayaChain network data:', error)
      setError('Failed to fetch MayaChain network data')
    }
  }, [])

  const fetchPoolData = useCallback(async (): Promise<void> => {
    try {
      // Fetch both pools and stats data from MayaChain
      const [poolsResponse, statsResponse] = await Promise.all([
        fetch('https://midgard.mayachain.info/v2/pools'),
        fetch('https://midgard.mayachain.info/v2/stats')
      ])

      if (!poolsResponse.ok) throw new Error(`MayaChain Pools API error: ${poolsResponse.status}`)
      if (!statsResponse.ok) throw new Error(`MayaChain Stats API error: ${statsResponse.status}`)

      const pools = await poolsResponse.json() as PoolData[]
      const stats = await statsResponse.json() as {
        cacaoPriceUSD: string
      }

      let totalLiquidityUSD = 0
      let totalVolume24hUSD = 0
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
            const runeDepth = parseInt(pool.runeDepth) / Math.pow(10, 10) // CACAO is 10 decimals

            // Use the actual CACAO price from MayaChain stats API
            const cacaoPriceUSD = parseFloat(stats.cacaoPriceUSD)

            // Calculate USD value of both sides of the pool
            const assetValueUSD = assetDepth * assetPriceUSD
            const cacaoValueUSD = runeDepth * cacaoPriceUSD

            // Debug logging for first few pools
            if (totalLiquidityUSD < 500000) { // Only log first few calculations
              console.log(`MayaChain Pool ${pool.asset}:`, {
                assetDepth: assetDepth.toFixed(2),
                assetPrice: assetPriceUSD,
                assetValueUSD: assetValueUSD.toFixed(2),
                cacaoDepth: runeDepth.toFixed(2),
                cacaoPrice: cacaoPriceUSD,
                cacaoValueUSD: cacaoValueUSD.toFixed(2),
                totalPoolValue: (assetValueUSD + cacaoValueUSD).toFixed(2)
              })
            }

            // Sanity check: individual pool shouldn't exceed $50M for MayaChain
            const poolTotalValue = assetValueUSD + cacaoValueUSD
            if (poolTotalValue > 0 && poolTotalValue < 50000000) {
              totalLiquidityUSD += poolTotalValue
            } else if (poolTotalValue >= 50000000) {
              console.warn(`Suspiciously high MayaChain pool value for ${pool.asset}: $${poolTotalValue.toFixed(2)}`)
            }

            if (pool.poolAPY != null && parseFloat(pool.poolAPY) > 0) {
              totalAPY += parseFloat(pool.poolAPY) * 100
              validPools++
            }
          } catch (error) {
            console.warn(`Error calculating liquidity for MayaChain pool ${pool.asset}:`, error)
          }
        }
      })

      // Calculate 24h volume from individual pool volumes
      pools.forEach((pool) => {
        if (pool.status === 'available' && pool.volume24h) {
          try {
            // Volume24h for MayaChain appears to be in CACAO units, convert to USD
            const volume24hCacao = parseInt(pool.volume24h) / Math.pow(10, 10)
            const cacaoPriceUSD = parseFloat(stats.cacaoPriceUSD)
            const poolVolume = volume24hCacao * cacaoPriceUSD

            // Sanity check for volume (individual pool shouldn't exceed $10M daily volume for MayaChain)
            if (poolVolume > 0 && poolVolume < 10000000) {
              totalVolume24hUSD += poolVolume
            }
          } catch (error) {
            console.warn(`Error calculating volume for MayaChain pool ${pool.asset}:`, error)
          }
        }
      })

      // Final sanity checks for MayaChain (smaller network)
      const isValidLiquidity = totalLiquidityUSD > 0 && totalLiquidityUSD < 1000000000 // Less than $1B
      const isValidVolume = totalVolume24hUSD > 0 && totalVolume24hUSD < 100000000 // Less than $100M daily

      console.log(`MayaChain Total Liquidity: $${totalLiquidityUSD.toFixed(2)}, Valid: ${isValidLiquidity}`)
      console.log(`MayaChain Total Volume 24h: $${totalVolume24hUSD.toFixed(2)}, Valid: ${isValidVolume}`)

      setPoolSummary({
        totalLiquidity: isValidLiquidity ? totalLiquidityUSD : 0,
        totalVolume24h: isValidVolume ? totalVolume24hUSD : 0,
        averageAPY: validPools > 0 ? totalAPY / validPools : 0,
        poolCount: pools.filter((p) => p.status === 'available').length,
        cacaoPriceUSD: parseFloat(stats.cacaoPriceUSD)
      })
    } catch (error) {
      console.error('Failed to fetch MayaChain pool data:', error)
      setError('Failed to fetch MayaChain pool data')
    }
  }, [])

  const fetchData = useCallback(async (): Promise<void> => {
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
      await Promise.all([fetchNetworkData(), fetchPoolData()])
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch MayaChain data:', error)
      setError('Failed to fetch MayaChain data')
    } finally {
      setLoading(false)
      isRefreshing.current = false
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
    }
  }, [fetchData])

  if (loading && !networkData && !poolSummary) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <Spinner size="lg" color="secondary" />
          <p className="mt-4 text-foreground/60">Loading live MayaChain metrics...</p>
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
            className="mt-4 px-4 py-2 bg-secondary text-white rounded"
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
          Live MayaChain{' '}
          <span className="bg-gradient-secondary bg-clip-text text-transparent">
            Metrics
          </span>
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
          <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : 'bg-teal-500'} ${loading ? 'animate-pulse' : ''}`}></div>
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          {error && <span className="text-danger text-xs ml-2">({error})</span>}
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Liquidity */}
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30 hover:shadow-glow-blue transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconCoins size={24} className="text-secondary" />
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
        <Card className="bg-gradient-to-br from-teal-500/20 to-teal-500/10 border-teal-500/30 hover:shadow-glow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconTrendingUp size={24} className="text-teal-500" />
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
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30 hover:shadow-glow-blue transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconServer size={24} className="text-secondary" />
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
        <Card className="bg-gradient-to-br from-teal-500/20 to-teal-500/10 border-teal-500/30 hover:shadow-glow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconBolt size={24} className="text-teal-500" />
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

        {/* CACAO Price */}
        <Card className="bg-gradient-to-br from-teal-500/20 to-teal-500/10 border-teal-500/30 hover:shadow-glow transition-all duration-300">
          <CardBody className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <IconCoins size={24} className="text-teal-500" />
            </div>
            <p className="text-xs text-foreground/60 mb-1">CACAO Price</p>
            <p className="text-lg sm:text-xl text-foreground">
              {poolSummary != null
                ? (
                <AnimatedCounter
                  value={poolSummary.cacaoPriceUSD}
                  formatter={(val) => `$${val.toFixed(4)}`}
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
              <IconServer size={20} className="text-secondary" />
              Network Health
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Total Pooled CACAO</span>
                <span className="text-sm font-semibold text-foreground">
                  {networkData != null ? `${formatCacao(networkData.totalPooledRune)} CACAO` : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Active Bonds</span>
                <span className="text-sm font-semibold text-foreground">
                  {networkData != null ? `${formatCacao(networkData.activeBonds)} CACAO` : '...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Bonding APY</span>
                <span className="text-sm font-semibold text-secondary">
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
              <IconCoins size={20} className="text-teal-500" />
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
                <span className="text-sm font-semibold text-teal-500">
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

