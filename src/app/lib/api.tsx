import type { ItemConfig } from '../ui/Selector'

export interface Release {
  id: number
  html_url: string
  tag_name: string
  created_at: string
  assets: any[]
  linux: any
  windows: any
  macSon: any
  macVent: any

}

const buildReleaseItem = (releaseItem: Release) => {
  const baseTitle = releaseItem.tag_name
  const linuxAsset = releaseItem.assets.find((asset) =>
    asset.browser_download_url.endsWith('.AppImage')
  ) || { browser_download_url: '' }
  const macAssetSon = releaseItem.assets.find((asset) =>
    asset.browser_download_url.includes('Sonoma') &&
    asset.browser_download_url.endsWith('.dmg')
  ) || { browser_download_url: '' }
  const macAssetVent = releaseItem.assets.find((asset) =>
    asset.browser_download_url.includes('Ventura') &&
    asset.browser_download_url.endsWith('.dmg')
  ) || { browser_download_url: '' }
  const windowsAsset = releaseItem.assets.find((asset) =>
    asset.browser_download_url.endsWith('.exe')
  ) || { browser_download_url: '' }

  return {
    tag_name: baseTitle,
    html_url: releaseItem.html_url,
    linux: {
      title: baseTitle,
      url: linuxAsset.browser_download_url
    },
    macSon: {
      title: `${baseTitle} Sonoma`, // Append "Sonoma" to title
      url: macAssetSon.browser_download_url
    },
    macVent: {
      title: `${baseTitle} Ventura`, // Append "Ventura" to title
      url: macAssetVent.browser_download_url
    },
    windows: {
      title: baseTitle,
      url: windowsAsset.browser_download_url
    }
  }
}

export async function getAsgardexReleases () {
  try {
    const cacheBuster = new Date().getTime()
    const res = await fetch(`https://api.github.com/repos/asgardex/asgardex-desktop/releases?nocache=${cacheBuster}`)
    const releases = await res.json()
    const latest = buildReleaseItem(releases.shift() as Release)

    const previous = releases.map((item: Release) => buildReleaseItem(item))
    return {
      latest,
      previous:
      {
        linux: previous.map((prev: Release) => prev.linux) as ItemConfig[],
        macSon: previous.map((prev: Release) => prev.macSon) as ItemConfig[],
        macVent: previous.map((prev: Release) => prev.macVent) as ItemConfig[],
        windows: previous.map((prev: Release) => prev.windows) as ItemConfig[]
      }
    }
  } catch {
    return { latest: { tag_name: null, html_url: 'https://github.com/asgardex/asgardex-desktop/releases/latest' }, previous: null }
  }
}
