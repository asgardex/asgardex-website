'use client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts'
import { Card, CardBody, CardHeader, Spinner } from '@nextui-org/react'
import { generateDownloadData, getDownloadTotals, getTopOperatingSystem, type DownloadData } from '../lib/downloadAnalytics'
import { useMemo, useEffect, useState } from 'react'

interface DownloadChartProps {
  variant?: 'line' | 'area'
  height?: number
  showStats?: boolean
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-default-200 rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} downloads
          </p>
        ))}
        <p className="text-xs text-foreground/60 mt-1 pt-1 border-t border-default-200">
          Total: {payload.reduce((sum: number, entry: any) => sum + (entry.name !== 'Total' ? entry.value : 0), 0).toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function DownloadChart({
  variant = 'area',
  height = 400,
  showStats = true
}: DownloadChartProps) {
  const [data, setData] = useState<DownloadData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const downloadData = await generateDownloadData()
        setData(downloadData)
      } catch (error) {
        console.error('Failed to load download data:', error)
        setData([])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const totals = useMemo(() => getDownloadTotals(data), [data])
  const topOS = useMemo(() => getTopOperatingSystem(data), [data])

  const ChartComponent = variant === 'line' ? LineChart : AreaChart

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <Card className="bg-default-50/50 backdrop-blur-sm border-default-200">
          <CardBody className="flex items-center justify-center p-12">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-foreground/60">Loading GitHub download data...</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="w-full space-y-6">
        <Card className="bg-default-50/50 backdrop-blur-sm border-default-200">
          <CardBody className="text-center p-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Download Data Available
            </h3>
            <p className="text-sm text-foreground/60">
              Unable to load download statistics from GitHub releases.
            </p>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {showStats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-subtle border-default-200 hover:shadow-lg transition-all duration-300">
            <CardBody className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-foreground/60">Total Downloads</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground">{totals.total.toLocaleString()}</p>
            </CardBody>
          </Card>
          <Card className="bg-gradient-subtle border-default-200 hover:shadow-lg transition-all duration-300">
            <CardBody className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-foreground/60">Windows</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground" style={{ color: '#00CCFF' }}>{totals.windows.toLocaleString()}</p>
            </CardBody>
          </Card>
          <Card className="bg-gradient-subtle border-default-200 hover:shadow-lg transition-all duration-300">
            <CardBody className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-foreground/60">macOS</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground" style={{ color: '#23DCC8' }}>{totals.macOS.toLocaleString()}</p>
            </CardBody>
          </Card>
          <Card className="bg-gradient-subtle border-default-200 hover:shadow-lg transition-all duration-300">
            <CardBody className="text-center p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-foreground/60">Linux</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground" style={{ color: '#33FF99' }}>{totals.linux.toLocaleString()}</p>
            </CardBody>
          </Card>
        </div>
      )}

      <Card className="bg-default-50/50 backdrop-blur-sm border-default-200">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div>
              <h3 className="text-lg font-bold text-foreground">Download Trends</h3>
              <p className="text-sm text-foreground/60">Operating system downloads over time</p>
            </div>
            {showStats && (
              <div className="mt-2 sm:mt-0 text-right">
                <p className="text-sm text-foreground/60">Most Popular</p>
                <p className="text-lg font-semibold text-primary">
                  {topOS.name} ({topOS.percentage}%)
                </p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="w-full overflow-hidden h-64 sm:h-80 lg:h-96" style={{ height }}>
            <ResponsiveContainer>
              <ChartComponent data={data} margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="gradientWindows" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00CCFF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00CCFF" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="gradientMacOS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#23DCC8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#23DCC8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="gradientLinux" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#33FF99" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#33FF99" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  className="text-foreground/60"
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  className="text-foreground/60"
                  tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '14px' }}
                  iconType="line"
                />

                {variant === 'area'
                  ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="windows"
                      stackId="1"
                      stroke="#00CCFF"
                      fill="url(#gradientWindows)"
                      fillOpacity={0.8}
                      name="Windows"
                    />
                    <Area
                      type="monotone"
                      dataKey="macOS"
                      stackId="1"
                      stroke="#23DCC8"
                      fill="url(#gradientMacOS)"
                      fillOpacity={0.8}
                      name="macOS"
                    />
                    <Area
                      type="monotone"
                      dataKey="linux"
                      stackId="1"
                      stroke="#33FF99"
                      fill="url(#gradientLinux)"
                      fillOpacity={0.8}
                      name="Linux"
                    />
                  </>
                    )
                  : (
                  <>
                    <Line
                      type="monotone"
                      dataKey="windows"
                      stroke="#00CCFF"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#00CCFF', strokeWidth: 2, stroke: '#ffffff' }}
                      name="Windows"
                    />
                    <Line
                      type="monotone"
                      dataKey="macOS"
                      stroke="#23DCC8"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#23DCC8', strokeWidth: 2, stroke: '#ffffff' }}
                      name="macOS"
                    />
                    <Line
                      type="monotone"
                      dataKey="linux"
                      stroke="#33FF99"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#33FF99', strokeWidth: 2, stroke: '#ffffff' }}
                      name="Linux"
                    />
                  </>
                    )}
              </ChartComponent>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
