export const formatCurrency = (value: string | number, decimals = 0): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`
  return `$${num.toFixed(decimals)}`
}

export const formatRune = (value: string, decimals = 8): string => {
  const num = parseInt(value) / Math.pow(10, decimals)
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toFixed(0)
}

export const formatCacao = (value: string, decimals = 10): string => {
  const num = parseInt(value) / Math.pow(10, decimals)
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toFixed(0)
}
