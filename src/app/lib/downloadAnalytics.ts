export interface DownloadData {
  date: string
  windows: number
  macOS: number
  linux: number
  total: number
  version: string
  created_at: string
}

interface GitHubRelease {
  id: number
  tag_name: string
  created_at: string
  assets: Array<{
    name: string
    download_count: number
    browser_download_url: string
  }>
}

// Get real download data from GitHub releases
export async function generateDownloadData(): Promise<DownloadData[]> {
  try {
    // Import the releases data
    const releasesModule = await import('../../releases.json')
    const releases = releasesModule.default as GitHubRelease[]

    const data: DownloadData[] = []

    // Process each release to extract download counts by OS
    releases.forEach((release) => {
      const releaseDate = new Date(release.created_at)
      const formattedDate = releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      })

      let windows = 0
      let macOS = 0
      let linux = 0

      // Parse download counts from assets
      release.assets.forEach((asset) => {
        const fileName = asset.name.toLowerCase()
        const downloadCount = asset.download_count || 0

        if (fileName.includes('.exe') || fileName.includes('windows')) {
          windows += downloadCount
        } else if (fileName.includes('.dmg') || fileName.includes('mac') || fileName.includes('darwin')) {
          macOS += downloadCount
        } else if (fileName.includes('.appimage') || fileName.includes('linux')) {
          linux += downloadCount
        }
      })

      const total = windows + macOS + linux

      // Only include releases with download data
      if (total > 0) {
        data.push({
          date: formattedDate,
          windows,
          macOS,
          linux,
          total,
          version: release.tag_name,
          created_at: release.created_at
        })
      }
    })

    // Sort by created_at timestamp and return latest releases
    return data
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .slice(-12) // Return last 12 releases
  } catch (error) {
    console.error('Failed to load GitHub releases data:', error)
    return []
  }
}

export const getDownloadTotals = (data: DownloadData[]) => {
  return data.reduce(
    (acc, month) => ({
      windows: acc.windows + month.windows,
      macOS: acc.macOS + month.macOS,
      linux: acc.linux + month.linux,
      total: acc.total + month.total
    }),
    { windows: 0, macOS: 0, linux: 0, total: 0 }
  )
}

export const getTopOperatingSystem = (data: DownloadData[]) => {
  const totals = getDownloadTotals(data)

  if (totals.windows >= totals.macOS && totals.windows >= totals.linux) {
    return { name: 'Windows', count: totals.windows, percentage: ((totals.windows / totals.total) * 100).toFixed(1) }
  } else if (totals.macOS >= totals.linux) {
    return { name: 'macOS', count: totals.macOS, percentage: ((totals.macOS / totals.total) * 100).toFixed(1) }
  } else {
    return { name: 'Linux', count: totals.linux, percentage: ((totals.linux / totals.total) * 100).toFixed(1) }
  }
}
