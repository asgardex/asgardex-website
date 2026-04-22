'use client'
import { useCallback } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { IconTrendingUp, IconCoins, IconServer, IconBolt } from '@tabler/icons-react'
import { AnimatedCounter } from './AnimatedCounter'
import { formatCurrency, formatRune } from '../lib/formatters'
import { useLiveData } from '../hooks/useLiveData'

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

interface ThorchainMetrics {
  networkData: NetworkData
  poolSummary: PoolSummary
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

export default function LiveMetricsWidget() {
  const fetchMetrics = useCallback(async (signal: AbortSignal): Promise<ThorchainMetrics> => {
    const [networkResponse, poolsResponse, statsResponse] = await Promise.all([
      fetch('https://gateway.liquify.com/chain/thorchain_midgard/v2/network', { signal }),
      fetch('https://gateway.liquify.com/chain/thorchain_midgard/v2/pools', { signal }),
      fetch('https://gateway.liquify.com/chain/thorchain_midgard/v2/stats', { signal })
    ])

    if (!networkResponse.ok) throw new Error(`Network API error: ${networkResponse.status}`)
    if (!poolsResponse.ok) throw new Error(`Pools API error: ${poolsResponse.status}`)
    if (!statsResponse.ok) throw new Error(`Stats API error: ${statsResponse.status}`)

    const networkApiData = await networkResponse.json() as NetworkApiData
    const pools = await poolsResponse.json() as PoolData[]
    const stats = await statsResponse.json() as {
      swapVolume: string
      runePriceUSD: string
      runeDepth: string
      swapCount24h: string
      swapCount30d: string
    }

    const networkData: NetworkData = {
      totalPooledRune: networkApiData.totalPooledRune,
      activeBonds: networkApiData.bondMetrics.totalActiveBond,
      bondingAPY: parseFloat(networkApiData.bondingAPY) * 100,
      liquidityAPY: parseFloat(networkApiData.liquidityAPY) * 100,
      activeNodeCount: networkApiData.activeNodeCount,
      nextChurnHeight: networkApiData.nextChurnHeight,
      totalReserve: networkApiData.totalReserve,
      poolActivationCountdown: networkApiData.poolActivationCountdown
    }

    let totalLiquidityUSD = 0
    let totalAPY = 0
    let validPools = 0

    pools.forEach((pool) => {
      if (pool.status === 'available') {
        try {
          const assetPriceUSD = parseFloat(pool.assetPriceUSD)
          const nativeDecimal = pool.nativeDecimal ?? 8
          const assetDepth = parseInt(pool.assetDepth) / Math.pow(10, nativeDecimal)
          const runeDepth = parseInt(pool.runeDepth) / Math.pow(10, 8)
          const runePriceUSD = parseFloat(stats.runePriceUSD)
          const assetValueUSD = assetDepth * assetPriceUSD
          const runeValueUSD = runeDepth * runePriceUSD
          const poolTotalValue = assetValueUSD + runeValueUSD
          if (poolTotalValue > 0 && poolTotalValue < 100000000) {
            totalLiquidityUSD += poolTotalValue
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

    let totalVolume24hUSD = 0
    pools.forEach((pool) => {
      if (pool.status === 'available' && pool.volume24h) {
        try {
          const volume24hRune = parseInt(pool.volume24h) / Math.pow(10, 8)
          const runePriceUSD = parseFloat(stats.runePriceUSD)
          const poolVolume = volume24hRune * runePriceUSD
          if (poolVolume > 0 && poolVolume < 50000000) {
            totalVolume24hUSD += poolVolume
          }
        } catch (error) {
          console.warn(`Error calculating volume for pool ${pool.asset}:`, error)
        }
      }
    })

    const isValidLiquidity = totalLiquidityUSD > 0 && totalLiquidityUSD < 10000000000
    const isValidVolume = totalVolume24hUSD > 0 && totalVolume24hUSD < 1000000000

    const poolSummary: PoolSummary = {
      totalLiquidity: isValidLiquidity ? totalLiquidityUSD : 0,
      totalVolume24h: isValidVolume ? totalVolume24hUSD : 0,
      averageAPY: validPools > 0 ? totalAPY / validPools : 0,
      poolCount: pools.filter((p) => p.status === 'available').length,
      runePriceUSD: parseFloat(stats.runePriceUSD)
    }

    return { networkData, poolSummary }
  }, [])

  const { data, loading, error, lastUpdate, retry } = useLiveData(fetchMetrics)

  if (loading && !data) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-foreground/60">Loading live protocol metrics...</p>
        </CardBody>
      </Card>
    )
  }

  if (error && !data) {
    return (
      <Card className="bg-gradient-subtle border-default-200">
        <CardBody className="flex items-center justify-center p-8">
          <p className="text-danger">{error}</p>
          <button
            onClick={retry}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </CardBody>
      </Card>
    )
  }

  const networkData = data?.networkData ?? null
  const poolSummary = data?.poolSummary ?? null

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
